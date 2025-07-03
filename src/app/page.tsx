'use client';
import { useEffect, useState } from 'react';
import {
  BadgePercent,
  Newspaper,
  LineChart,
  Globe,
  Zap
} from 'lucide-react';
import Timestamp from "@/app/components/Timestamp";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  getTrendColor,
  getTrendBorder,
  getTrendBg,
  getTrendIcon,
  getTrendProgressColor,
  getTrendLabel,
  type TrendType
} from "@/lib/trendUtils";

interface StockItem {
  ticker: string;
  name: string;
}

interface SectorInsight {
  sector: string;
  trend: TrendType;
  reason: string;
  confidence: number;
  top_stocks?: StockItem[];
}

interface Sp500Insight {
  trend: TrendType;
  reason: string;
  confidence: number;
}

export default function Home() {
  const [news, setNews] = useState<string[]>([]);
  const [sectors, setSectors] = useState<SectorInsight[]>([]);
  const [sp500, setSp500] = useState<Sp500Insight | null>(null);
  const [timestamp, setTimestamp] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('https://finance-sektor-daten.s3.eu-central-1.amazonaws.com/latest.json');
      const data = await res.json();
      setNews(data.news || []);
      setSectors(data.sectors || []);
      setSp500(data.sp500 || null);
      if (data.timestamp) setTimestamp(data.timestamp);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
        <Header
            timestamp={timestamp}
            isLoading={isLoading}
        />

        <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              📊 Makroökonomische Sektor-Analyse
            </h1>
            {timestamp && <Timestamp iso={timestamp} />}
          </div>

          {/* S&P 500 Analysis */}
          {sp500 && (
              <div className="mb-8">
                <div className={`p-6 rounded-2xl shadow-lg border-l-4 ${getTrendBorder(sp500.trend)} bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <LineChart className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">S&P 500 Index</h2>
                        <p className="text-sm text-gray-500">Gesamtmarkt-Einschätzung</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTrendBg(sp500.trend)} ${getTrendColor(sp500.trend)}`}>
                        {getTrendLabel(sp500.trend)}
                      </div>
                      {getTrendIcon(sp500.trend)}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{sp500.reason}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BadgePercent className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Confidence: {(sp500.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${sp500.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
          )}

          {/* News Section */}
          {news.length > 0 && (
              <div className="mb-8">
                <div className="p-6 rounded-2xl shadow-lg border-l-4 border-l-blue-500 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Newspaper className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Aktuelle Markt-News</h2>
                      <p className="text-sm text-gray-500">Wichtige Ereignisse heute</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {news.map((headline, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-700">{headline}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          )}

          {/* Sectors Grid */}
          {sectors.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Globe className="w-6 h-6 text-gray-700" />
                  <h2 className="text-2xl font-bold text-gray-800">Sektor-Analyse</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sectors.map((sector, index) => (
                      <div
                          key={index}
                          className={`group p-6 rounded-2xl shadow-lg border-l-4 ${getTrendBorder(sector.trend)} bg-white/90 backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {sector.sector}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTrendBg(sector.trend)} ${getTrendColor(sector.trend)}`}>
                              {getTrendLabel(sector.trend)}
                            </div>
                            {getTrendIcon(sector.trend, 'sm')}
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4">{sector.reason}</p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{(sector.confidence * 100).toFixed(0)}%</span>
                          </div>
                          <div className="w-20 bg-gray-200 rounded-full h-1.5">
                            <div
                                className={`h-1.5 rounded-full transition-all duration-500 ${getTrendProgressColor(sector.trend)}`}
                                style={{ width: `${sector.confidence * 100}%` }}
                            />
                          </div>
                        </div>

                        {sector.top_stocks && sector.top_stocks.length > 0 && (
                            <div className="border-t pt-4">
                              <p className="text-xs text-gray-500 mb-2">Top-Aktien:</p>
                              <div className="flex flex-wrap gap-2">
                                {sector.top_stocks.map((stock) => (
                                    <a
                                        key={stock.ticker}
                                        href={`https://www.tradingview.com/chart/?symbol=${stock.ticker}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-2 py-1 bg-gray-100 hover:bg-blue-100 rounded-md text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors"
                                        title={stock.name}
                                    >
                                      {stock.ticker}
                                    </a>
                                ))}
                              </div>
                            </div>
                        )}
                      </div>
                  ))}
                </div>
              </div>
          )}
        </main>

        <Footer />
      </div>
  );
}