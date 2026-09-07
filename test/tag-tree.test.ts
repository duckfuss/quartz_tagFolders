import { describe, expect, it } from "vitest";
import { buildTagTree } from "../src/tag-tree";

describe("buildTagTree", () => {
  it("creates nested folders from slash-delimited tags", () => {
    const tree = buildTagTree([
      { slug: "one", title: "One", tags: ["guide/typescript"] },
      { slug: "two", title: "Two", tags: ["guide/testing"] },
      { slug: "three", title: "Three", tags: ["#guide/typescript"] },
    ]);

    expect(tree.children.map((node) => node.name)).toEqual(["guide"]);
    expect(tree.children[0]?.children.map((node) => node.name)).toEqual(["testing", "typescript"]);
    expect(tree.children[0]?.children[1]?.pages.map((page) => page.slug)).toEqual(["one", "three"]);
  });

  it("places a page in each of its tag folders", () => {
    const tree = buildTagTree([{ slug: "note", tags: ["work", "personal"] }]);

    expect(tree.children.map((node) => node.name)).toEqual(["personal", "work"]);
    expect(tree.children.every((node) => node.pages[0]?.slug === "note")).toBe(true);
  });
});
