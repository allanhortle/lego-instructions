import loadCSV from './loadCSV';

export type Theme = {id: string; name: string; parent_id: string; children: Theme[]};

let cache: null | {
    themeList: Theme[];
    themeMap: Record<string, Theme>;
} = null;

export default async function getThemes() {
    if (cache) return cache;

    const csv = await loadCSV<{
        id: string;
        name: string;
        parent_id: string;
    }>('data/themes.csv');

    const themeMap = {};
    const themeList: Theme[] = [];

    csv.forEach((data) => (themeMap[data.id] = {...data, children: []}));
    csv.forEach((data) => {
        const next = themeMap[data.id];
        if (data.parent_id) themeMap[data.parent_id].children.push(next);
        else themeList.push(next);
    });

    cache = {themeList, themeMap};
    return cache;
}
