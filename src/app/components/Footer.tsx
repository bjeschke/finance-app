export default function Footer() {
    return (
        <footer className="bg-white shadow-inner p-4 mt-12">
            <div className="max-w-4xl mx-auto text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Makro Sektor Dashboard
            </div>
        </footer>
    );
}