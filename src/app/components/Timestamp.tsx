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
        <p className="text-center text-sm text-gray-500 mb-8">
            Letzte Aktualisierung: {formatted} Uhr
        </p>
    );
}