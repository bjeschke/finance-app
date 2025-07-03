'use client';

import React from 'react';

/*
    Energie	XLE	Energy Select Sector SPDR Fund
    Werkstoffe (Materials)	XLB	Materials Select Sector SPDR Fund
    Industrie (Industrials)	XLI	Industrial Select Sector SPDR Fund
    Zyklischer Konsum	XLY	Consumer Discretionary Select Sector SPDR Fund
    Basiskonsumgüter	XLP	Consumer Staples Select Sector SPDR Fund
    Gesundheitswesen	XLV	Health Care Select Sector SPDR Fund
    Finanzwesen	XLF	Financial Select Sector SPDR Fund
    Informationstechnologie	XLK	Technology Select Sector SPDR Fund
    Kommunikationsdienste	XLC	Communication Services Select Sector SPDR Fund
    Versorger	XLU	Utilities Select Sector SPDR Fund
    Immobilien	XLRE	Real Estate Select Sector SPDR Fund

 */

type Sector = {
    name: string;
    ticker: string; // z.B. "AMEX:XLE"
    image?: string; // Optionaler Screenshot
};

const sectors: Sector[] = [
    { name: 'Energie', ticker: 'AMEX:XLE', image: 'https://www.tradingview.com/x/abc123/' },
    { name: 'Werkstoffe', ticker: 'AMEX:XLB', image: 'https://www.tradingview.com/x/def456/' },
    { name: 'Industrie', ticker: 'AMEX:XLI', image: 'https://www.tradingview.com/x/ghi789/' },
    // weitere Sektoren...
];

export default function SectorChart() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {sectors.map((sector) => (
                <div key={sector.name} className="border rounded-xl shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2">{sector.name}</h2>

                    {/* Bild (Screenshot) */}
                    {sector.image ? (
                        <img
                            src={sector.image}
                            alt={`${sector.name} Chart`}
                            className="rounded-md w-full"
                        />
                    ) : (
                        // Live Embed fallback
                        <iframe
                            src={`https://s.tradingview.com/embed-widget/mini-symbol-overview/?symbol=${sector.ticker}&locale=de`}
                            width="100%"
                            height="220"
                            frameBorder="0"
                            allowTransparency
                            allowFullScreen
                            className="rounded-md"
                        ></iframe>
                    )}
                </div>
            ))}
        </div>
    );
}
