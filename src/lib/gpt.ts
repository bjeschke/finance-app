export async function fetchAnalysis() {
    const prompt = `
Du bist ein Finanzanalyst. Antworte ausschließlich im folgenden JSON-Format — **ohne Vorrede, ohne Erklärung**.

{
  "news": ["..."],
  "sectors": [
    {
      "sector": "string",
      "trend": "bullish" | "bearish" | "neutral",
      "reason": "string",
      "confidence": number (0–1),
         "top_stocks": [
        { "ticker": "XOM", "name": "ExxonMobil" },
        { "ticker": "CVX", "name": "Chevron" }
      ]
    }
  ]
}

Erstelle auf Basis heutiger makroökonomischer Entwicklungen eine Liste von relevanten Nachrichten und analysiere, welche Sektoren wahrscheinlich steigen oder fallen.
Gib für jeden Sektor auch 2–5 passende Aktien-Ticker zurück.
Nochmals: **keine Erklärung, keine Umschreibung – nur das JSON-Objekt wie oben.**
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
        }),
    });

    const result = await res.json();
    console.log('🔎 GPT raw result:', result);

    const content = result.choices?.[0]?.message?.content;
    if (!content) throw new Error("GPT-Antwort leer oder ungültig");

    return JSON.parse(content);
}

