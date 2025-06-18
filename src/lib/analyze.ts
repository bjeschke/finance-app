export async function fetchNews(): Promise<string[]> {
    return [
        "Ölpreis explodiert nach Angriff im Nahen Osten",
        "Zinsentscheidung verschoben – Märkte reagieren nervös",
        "Verteidigung & Energie im Aufwind",
    ];
}

export async function analyzeSectors(news: string[]) {
    const sectors = [];

    if (news.some(n => n.toLowerCase().includes("ölpreis"))) {
        sectors.push({
            sector: "Energie",
            trend: "bullish",
            reason: "Ölpreis gestiegen",
            confidence: 0.9,
        });
    }

    if (news.some(n => n.includes("Verteidigung"))) {
        sectors.push({
            sector: "Verteidigung",
            trend: "bullish",
            reason: "Geopolitische Eskalation",
            confidence: 0.8,
        });
    }

    return sectors;
}
