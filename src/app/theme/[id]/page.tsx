import React from 'react';
import LinkList from '../../../affordance/LinkList';
import loadCSV from '../../../service/loadCSV';
import loadThemes from '../../../service/loadThemes';

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
export async function generateStaticParams() {
    const items = await loadCSV<{theme_id: string}>('data/sets.csv');
    return items.map((set) => ({id: set.theme_id}));
}

export default async function Theme(props: {params: {id: string}}) {
    const sets = await getSets(props.params.id);
    const {themeMap, themeList} = await loadThemes();

    function getFolders(id: string, list: typeof themeList = []) {
        const item = themeMap[id];
        list = list.concat(item);
        if (item.parent_id) return getFolders(item.parent_id, list);
        return list;
    }
    const theme = themeMap[props.params.id];

    return (
        <>
            <h1 className="text-2xl flex gap-3">
                <a href="/">Lego Instructions</a>
                {getFolders(props.params.id)
                    .reverse()
                    .map((ii) => (
                        <React.Fragment key={ii.id}>
                            <span>/</span>
                            <a href={`/theme/${ii.id}`}>{ii.name}</a>
                        </React.Fragment>
                    ))}
            </h1>
            {theme.children.length > 0 && (
                <div className="pt-2">
                    <LinkList hideRoot theme={theme} depth={0} />
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-8 gap-3 border-spacing-1 mt-4">
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
                            <img
                                loading="lazy"
                                className="m-auto mx-2"
                                src={ii.img_url}
                                height="200"
                            />
                        </a>
                    );
                })}
            </div>
        </>
    );
}
