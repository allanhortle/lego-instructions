import React from 'react';
import loadCSV from '../../../service/loadCSV';

async function getSets(theme: string) {
    const items = await loadCSV<{
        set_num: string;
        name: string;
        year: string;
        theme_id: string;
        img_url: string;
    }>('data/sets.csv');
    return items.filter((ii) => ii.theme_id === theme);
}

export default async function Theme(props: {params: {id: string}}) {
    const sets = await getSets(props.params.id);
    return (
        <div className="grid grid-cols-6 gap-3 border-spacing-1 mt-4">
            {sets.length === 0 && <div>This theme is empty...</div>}
            {sets.map((ii) => {
                const id = ii.set_num.split('-')[0];
                return (
                    <a
                        key={ii.set_num}
                        href={`https://www.lego.com/en-au/service/buildinginstructions/${id}`}
                        className="border-2  h-full flex flex-col"
                    >
                        <div className="text-gray-500 p-1 pt-0 text-xs line-clamp-1 leading-5">
                            {id} {ii.name}
                        </div>
                        <img loading="lazy" className="m-auto mx-2" src={ii.img_url} height="200" />
                    </a>
                );
            })}
        </div>
    );
}
