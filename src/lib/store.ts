import { writeFile, readFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import { existsSync } from 'fs';

const filePath = './data/latest.json';

export async function saveToFile(data: unknown) {
    const dir = dirname(filePath);
    if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
    }
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function readFromFile() {
    try {
        const content = await readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch {
        return { news: [], sectors: [] };
    }
}