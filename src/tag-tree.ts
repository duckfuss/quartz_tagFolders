export interface TagPage {
  slug: string;
  title: string;
}

export interface TagTreeNode {
  name: string;
  path: string;
  pages: TagPage[];
  children: TagTreeNode[];
}

export interface TagIndexEntry {
  slug: string;
  title?: string;
  tags?: unknown;
}

const normalizeTag = (tag: unknown) => {
  if (typeof tag !== "string") return [];
  return tag
    .trim()
    .replace(/^#/, "")
    .split(/[\\/]/)
    .map((part) => part.trim())
    .filter(Boolean);
};

const sortNodes = (nodes: TagTreeNode[]) => {
  nodes.sort((left, right) => left.name.localeCompare(right.name));
  for (const node of nodes) {
    node.pages.sort((left, right) => left.title.localeCompare(right.title));
    sortNodes(node.children);
  }
};

/** Builds a folder-shaped tree from Quartz content index entries. */
export const buildTagTree = (entries: TagIndexEntry[]) => {
  const root: TagTreeNode = { name: "", path: "", pages: [], children: [] };

  for (const entry of entries) {
    if (!entry.slug) continue;
    const page = { slug: entry.slug, title: entry.title?.trim() || entry.slug };
    const paths = Array.isArray(entry.tags)
      ? entry.tags.map(normalizeTag).filter((parts) => parts.length > 0)
      : [];

    for (const parts of paths) {
      let current = root;
      const pathParts: string[] = [];
      for (const name of parts) {
        pathParts.push(name);
        let child = current.children.find((node) => node.name === name);
        if (!child) {
          child = { name, path: pathParts.join("/"), pages: [], children: [] };
          current.children.push(child);
        }
        current = child;
      }
      current.pages.push(page);
    }
  }

  sortNodes(root.children);
  return root;
};
