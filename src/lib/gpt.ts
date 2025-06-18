export async function fetchAnalysis() {
    const prompt = `Liefere makroökonomische Nachrichten und analysiere Sektoren. Format:
{
  "news": ["..."],
  "sectors": [
    { "sector": "...", "trend": "bullish", "reason": "...", "confidence": 0.9 }
  ]
}`;

    console.log('Hallo');

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

