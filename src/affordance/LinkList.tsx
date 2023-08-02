import type {Theme} from '../service/loadThemes';
import Link from 'next/link';
import classnames from 'classnames';

export default function LinkList(props: {theme: Theme; depth: number; hideRoot?: boolean}) {
    const {theme, depth, hideRoot} = props;
    const {id, name, children} = theme;
    const showRoot = !hideRoot;
    return (
        <ul className={depth === 0 ? 'pb-2' : ''}>
            {showRoot && (
                <li>
                    <Link
                        href={`/theme/${id}`}
                        children={name}
                        className="text-blue-700 underline"
                    />
                </li>
            )}

            {children.length > 0 && (
                <ul className={classnames({'pl-4': showRoot})}>
                    {children.map((ii) => (
                        <li key={ii.id}>
                            <LinkList theme={ii} depth={depth + 1} />
                        </li>
                    ))}
                </ul>
            )}
        </ul>
    );
}
