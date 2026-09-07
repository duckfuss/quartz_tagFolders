import { QuartzComponent } from '@quartz-community/types';

interface TagExplorerOptions {
    title?: string;
    showUntagged?: boolean;
    untaggedLabel?: string;
    className?: string;
}
declare const _default: (options?: TagExplorerOptions) => QuartzComponent;

export { _default as TagExplorer, type TagExplorerOptions };
