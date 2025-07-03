import { Clock } from 'lucide-react';

interface TimestampProps {
    iso: string;
}

export default function Timestamp({ iso }: TimestampProps) {
    const formatted = new Date(iso).toLocaleString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="p-2 bg-blue-50 rounded-lg">
                <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 font-medium">
                Letzte Aktualisierung: <span className="text-blue-600">{formatted} Uhr</span>
            </p>
        </div>
    );
}