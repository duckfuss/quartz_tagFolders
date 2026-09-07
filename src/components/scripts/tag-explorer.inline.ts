// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

function normalizeTag(tag) {
  if (typeof tag !== "string") return [];
  return tag
    .trim()
    .replace(/^#/, "")
    .split(/[\\/]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildTagTree(entries) {
  const root = { name: "", pages: [], children: [] };
  for (const entry of entries) {
    if (!entry.slug) continue;
    const page = { slug: entry.slug, title: entry.title || entry.slug };
    const paths = Array.isArray(entry.tags)
      ? entry.tags.map(normalizeTag).filter((parts) => parts.length)
      : [];
    for (const parts of paths) {
      let current = root;
      for (const name of parts) {
        let child = current.children.find((node) => node.name === name);
        if (!child) {
          child = { name, pages: [], children: [] };
          current.children.push(child);
        }
        current = child;
      }
      current.pages.push(page);
    }
  }
  const sort = (nodes) => {
    nodes.sort((left, right) => left.name.localeCompare(right.name));
    for (const node of nodes) {
      node.pages.sort((left, right) => left.title.localeCompare(right.title));
      sort(node.children);
    }
  };
  sort(root.children);
  return root;
}

function tagExplorerEntries(data) {
  if (Array.isArray(data)) return data;
  return Object.entries(data || {}).map(([slug, entry]) => ({ slug, ...entry }));
}

function tagExplorerPageLink(page) {
  const link = document.createElement("a");
  link.href = `/${String(page.slug).replace(/^\/+/, "")}`;
  link.textContent = page.title || page.slug;
  return link;
}

function tagExplorerNode(node) {
  const list = document.createElement("ul");
  list.className = "tag-explorer__list";
  for (const child of node.children || []) {
    const item = document.createElement("li");
    item.className = "tag-explorer__folder";
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "tag-explorer__toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = child.name;
    const childList = tagExplorerNode(child);
    childList.hidden = true;
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      childList.hidden = expanded;
    });
    item.append(toggle, childList);
    list.append(item);
  }
  for (const page of node.pages || []) {
    const item = document.createElement("li");
    item.className = "tag-explorer__page";
    item.append(tagExplorerPageLink(page));
    list.append(item);
  }
  return list;
}

async function renderTagExplorers() {
  const components = document.querySelectorAll("[data-tag-explorer]");
  if (!components.length) return;
  let data;
  try {
    data = await fetchData;
  } catch {
    data = null;
  }
  for (const component of components) {
    const status = component.querySelector("[data-tag-explorer-status]");
    if (!status) continue;
    const entries = tagExplorerEntries(data).filter((entry) => entry && entry.slug);
    const tree = buildTagTree(entries);
    if (component.dataset.showUntagged === "true") {
      const untagged = entries.filter(
        (entry) =>
          !Array.isArray(entry.tags) || !entry.tags.some((tag) => normalizeTag(tag).length),
      );
      if (untagged.length)
        tree.children.push({
          name: component.dataset.untaggedLabel || "Untagged",
          pages: untagged,
          children: [],
        });
    }
    status.replaceWith(tagExplorerNode(tree));
  }
}

const handleTagExplorerNav = () => renderTagExplorers();
document.addEventListener("nav", handleTagExplorerNav);
document.addEventListener("render", handleTagExplorerNav);
if (typeof window !== "undefined" && window.addCleanup) {
  window.addCleanup(() => {
    document.removeEventListener("nav", handleTagExplorerNav);
    document.removeEventListener("render", handleTagExplorerNav);
  });
}
renderTagExplorers();
