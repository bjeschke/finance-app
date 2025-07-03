import {Calendar} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white/80 backdrop-blur-md border-t border-white/20 py-8">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
              © {new Date().getFullYear()} Makro Sektor Dashboard
            </span>
                </div>
                <p className="text-xs text-gray-500">
                    Powered by Real-time Market Analysis
                </p>
            </div>
        </footer>
    );
}