export async function fetchAnalysis() {
    const prompt = `
Stand: ${new Date().toLocaleDateString("de-DE")} – ${new Date().toLocaleTimeString("de-DE")}

Analysiere die heutigen makroökonomischen Nachrichten (z. B. Inflationsdaten, Zinsentscheidungen, geopolitische Ereignisse, Rohstoffpreise).

### 1. Sektoranalyse
Beurteile jeden der folgenden 11 GICS-Sektoren:
- Energie
- Werkstoffe
- Industrie
- zyklischer Konsum
- Basiskonsumgüter
- Gesundheitswesen
- Finanzwesen
- Informationstechnologie
- Kommunikationsdienste
- Versorger
- Immobilien

Für jeden Sektor:
- trend: "bullish", "bearish" oder "neutral"
- reason: 1 kurzer Satz mit Begründung
- confidence: Zahl zwischen 0 und 1
- top_stocks: 2–4 relevante Aktien mit Ticker + Unternehmensnamen

### 2. S&P 500 Index
Gib eine zusätzliche Einschätzung zum Gesamtmarkt:
- trend: wie oben
- reason: 1 Satz
- confidence: Zahl zwischen 0 und 1

### Format:
Antworte ausschließlich im folgenden JSON-Format:

{
    "timestamp": "2023-10-01T12:00:00Z",
},
{
  "news": ["Kurze Nachricht 1", "Kurze Nachricht 2", "..."],
  "sp500": {
    "trend": "neutral",
    "reason": "Markt wartet auf Fed-Entscheidung.",
    "confidence": 0.7
  },
  "sectors": [
    {
      "sector": "Energie",
      "trend": "bullish",
      "reason": "Ölpreis steigt wegen Nahost-Spannungen.",
      "confidence": 0.8,
      "top_stocks": [
        { "ticker": "XOM", "name": "ExxonMobil" },
        { "ticker": "CVX", "name": "Chevron" }
      ]
    }
  ]
}
Wichtig: **Kein zusätzlicher Text, keine Erklärungen**, nur reines JSON wie oben.
**Achte streng darauf, dass dein Output mit { beginnt und mit } endet. Keine Einleitung.**
Antworte ohne Markdown oder Einleitung. Nur reines JSON.
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0,
        }),
    });

    const result = await res.json();
    const content = result.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error("GPT-Antwort leer oder ungültig");
    }

    const cleanedRaw = content
        .replace(/^```json\s*/i, '')
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim();

    const match = cleanedRaw.match(/{[\s\S]*}/);

    if (!match) {
        console.error("❌ Kein JSON-Block gefunden");
        console.error("📦 GPT Response (raw):", content);
        throw new Error("Keine JSON-Struktur gefunden");
    }

    const cleanedJson = match[0];

    try {
        return JSON.parse(cleanedJson);
    } catch (err) {
        console.error("❌ Fehler beim JSON-Parsing:", err);
        console.error("📦 JSON (cleaned):", cleanedJson);
        throw new Error("Antwort war kein gültiges JSON");
    }
}
