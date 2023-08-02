import React from 'react';
import loadThemes from '../service/loadThemes';
import LinkList from '../affordance/LinkList';

export default async function Theme() {
    const {themeList} = await loadThemes();
    return (
        <>
            <h1 className="text-2xl">
                <a href="/">Lego Instructions</a>
            </h1>
            <ul className="p-4">
                {themeList
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((ii) => (
                        <LinkList key={ii.id} theme={ii} depth={0} />
                    ))}
            </ul>
        </>
    );
}
