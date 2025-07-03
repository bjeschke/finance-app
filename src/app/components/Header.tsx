'use client';
import { BarChart3, Clock, RefreshCw } from 'lucide-react';

interface HeaderProps {
    timestamp?: string;
    onRefresh?: () => void;
    isLoading?: boolean;
}

export default function Header({ timestamp}: HeaderProps) {
    const formatTimestamp = (iso: string) => {
        return new Date(iso).toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                            <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Makro Dashboard
                            </h1>
                            <p className="text-sm text-gray-500">Live Marktanalyse</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{timestamp ? formatTimestamp(timestamp) : 'Laden...'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}