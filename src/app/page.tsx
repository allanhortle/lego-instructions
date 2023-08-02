import React from 'react';
import loadCSV from '../service/loadCSV';
import Link from 'next/link';

type Theme = {id: string; name: string; parent_name: string; children: Theme[]};
async function getThemes() {
    const themes = await loadCSV<{
        id: string;
        name: string;
        parent_id: string;
    }>('data/themes.csv');

    const hashTable = {};
    themes.forEach((data) => (hashTable[data.id] = {...data, children: []}));
    const response: Theme[] = [];

    themes.forEach((data) => {
        const next = hashTable[data.id];
        if (data.parent_id) hashTable[data.parent_id].children.push(next);
        else response.push(next);
    });

    return response;
}

export default async function Theme() {
    const themes = await getThemes();
    return (
        <ul className="p-4">
            {themes
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((ii) => (
                    <LinkList key={ii.id} theme={ii} depth={0} />
                ))}
        </ul>
    );
}

function LinkList({theme, depth}: {theme: Theme; depth: number}) {
    const {id, name, children} = theme;
    return (
        <ul className={depth === 0 ? 'pb-2' : ''}>
            <li>
                <Link href={`/theme/${id}`} children={name} className="text-blue-700 underline" />
            </li>

            {children.length > 0 && (
                <ul className="pl-4">
                    {children.map((ii, index) => (
                        <li>
                            <LinkList key={ii.id} theme={ii} depth={depth + 1} />
                        </li>
                    ))}
                </ul>
            )}
        </ul>
    );
}
