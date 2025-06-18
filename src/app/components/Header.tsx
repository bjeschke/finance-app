export default function Header() {
    return (
        <header className="bg-white shadow p-4 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">📈 Makro Dashboard</h1>
                <span className="text-sm text-gray-500">Live Analyse</span>
            </div>
        </header>
    );
}