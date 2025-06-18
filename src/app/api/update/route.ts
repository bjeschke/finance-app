
import { NextRequest } from 'next/server';
import { fetchAnalysis } from '@/lib/gpt';
import { saveToFile, readFromFile } from '@/lib/store';

export async function POST(req: NextRequest) {
    try {
        const result = await fetchAnalysis();
        await saveToFile(result);
        return Response.json({ status: 'ok', result });
    } catch (error) {
        return Response.json({ status: 'error', message: error instanceof Error ? error.message : 'Unbekannter Fehler' }, { status: 500 });
    }
}

export async function GET() {
    const data = await readFromFile();
    return Response.json(data);
}
