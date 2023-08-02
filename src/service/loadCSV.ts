import * as fs from 'fs';
import {parse} from '@fast-csv/parse';
export default function loadCSV<T>(path: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const items = [];
        fs.createReadStream(path)
            .pipe(parse({headers: true}))
            .on('error', reject)
            .on('data', (row) => items.push(row))
            .on('end', () => resolve(items));
    });
}
