import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import style from "./styles/tag-explorer.scss";
// @ts-expect-error - inline script import handled by Quartz bundler
import script from "./scripts/tag-explorer.inline.ts";

export interface TagExplorerOptions {
  title?: string;
  showUntagged?: boolean;
  untaggedLabel?: string;
  className?: string;
}

export default ((options?: TagExplorerOptions) => {
  const {
    title = "Tags",
    showUntagged = false,
    untaggedLabel = "Untagged",
    className = "tag-explorer",
  } = options ?? {};

  const Component: QuartzComponent = (_props: QuartzComponentProps) => (
    <details
      class={className}
      data-tag-explorer
      data-show-untagged={showUntagged ? "true" : "false"}
      data-untagged-label={untaggedLabel}
      open
    >
      <summary class="tag-explorer__summary">
        <span>{title}</span>
      </summary>
      <nav aria-label={title}>
        <div class="tag-explorer__status" data-tag-explorer-status>
          Loading tags...
        </div>
      </nav>
    </details>
  );

  Component.css = style;
  Component.afterDOMLoaded = script;
  return Component;
}) satisfies QuartzComponentConstructor;
