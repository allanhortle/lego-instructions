import React from 'react';
import * as fs from 'fs';
import {parse} from '@fast-csv/parse';

function loadCSV<T>(path: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const items = [];
        fs.createReadStream('data/sets.csv')
            .pipe(parse({headers: true}))
            .on('error', reject)
            .on('data', (row) => items.push(row))
            .on('end', () => resolve(items));
    });
}

async function getSets(theme: string) {
    const items = await loadCSV<{
        set_num: string;
        name: string;
        year: string;
        theme_id: string;
        img_url: string;
    }>('data/sets.csv');
    //console.log(items);
    return items.filter((ii) => ii.theme_id === theme);
}

export default async function Theme(props: {params: {theme: string}}) {
    const sets = await getSets(props.params.theme);
    console.log(props);
    return (
        <div className="grid grid-cols-6 border-spacing-1">
            {sets.map((ii) => (
                <div
                    key={ii.set_num}
                    className="border-2 border-sky-500 h-full flex flex-col justify-center"
                >
                    <img src={ii.img_url} height="200" />
                </div>
            ))}
        </div>
    );
}
