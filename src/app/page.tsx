'use client';
import { useEffect, useState } from 'react';
import { BadgePercent, TrendingUp, TrendingDown, Activity, Newspaper } from 'lucide-react';

interface SectorInsight {
  sector: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  reason: string;
  confidence: number;
  top_stocks?: { ticker: string; name: string }[];
}

export default function Home() {
  const [news, setNews] = useState<string[]>([]);
  const [sectors, setSectors] = useState<SectorInsight[]>([]);

  useEffect(() => {
    fetch('/api/update')
        .then((res) => res.json())
        .then((data) => {
          setNews(data.news || []);
          setSectors(data.sectors || []);
        })
        .catch((err) => console.error('Fehler beim Laden:', err));
  }, []);

  const trendIcon = (trend: SectorInsight['trend']) => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="text-green-500" />;
      case 'bearish': return <TrendingDown className="text-red-500" />;
      case 'neutral': return <Activity className="text-gray-500" />;
    }
  };

  return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-10 text-slate-800">
            📊 Makroökonomische Sektor-Analyse
          </h1>

          <div className="mb-10 p-4 bg-white shadow rounded-xl border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <Newspaper className="text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-700">Aktuelle News</h2>
            </div>
            <ul className="list-disc list-inside text-slate-600 text-sm">
              {news.map((headline, idx) => (
                  <li key={idx}>{headline}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sectors.map((s, index) => (
                <div
                    key={index}
                    className={`p-6 rounded-2xl shadow-lg border-t-4 transition-all duration-300 ease-in-out hover:scale-[1.02] bg-white ${
                        s.trend === 'bullish'
                            ? 'border-green-500'
                            : s.trend === 'bearish'
                                ? 'border-red-500'
                                : 'border-gray-400'
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-slate-700">{s.sector}</h2>
                    <div className="w-6 h-6">{trendIcon(s.trend)}</div>
                  </div>
                  <p className="text-slate-600 text-sm mb-2">
                    <strong>Begründung:</strong> {s.reason}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <BadgePercent className="w-4 h-4 mr-1" />
                    Confidence: {(s.confidence * 100).toFixed(0)}%
                  </div>
                  {s.top_stocks && s.top_stocks.length > 0 && (
                      <p className="text-sm text-slate-600">
                        <strong>Top-Aktien:</strong>{' '}
                        {s.top_stocks.map((stock, i) => (
                            <span key={stock.ticker} className="inline-block mr-2">
                      <span title={stock.name}>{stock.ticker}</span>
                              {i < s.top_stocks!.length - 1 && ','}
                    </span>
                        ))}
                      </p>
                  )}
                </div>
            ))}
          </div>
        </div>
      </main>
  );
}