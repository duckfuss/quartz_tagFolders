# Website Agent Instructions

Use this brief when integrating the nested tag explorer into a Quartz 5 website.

## Goal

Add the `TagExplorer` component from `github:duckfuss/quartz_tagFolders` to the website's existing
sidebar or other layout position. Do not replace the native Explorer unless the site owner asks for
that specifically.

## Steps

1. Install the plugin from the website repository:

   ```bash
   npx quartz plugin add github:duckfuss/quartz_tagFolders
   ```

2. Enable it in `quartz.config.yaml`:

   ```yaml
   plugins:
     - source: github:duckfuss/quartz_tagFolders
       enabled: true
       options:
         title: Tags
         showUntagged: false
         untaggedLabel: Untagged
   ```

3. Open the site's layout file, usually `quartz.layout.ts`, and add the generated `TagExplorer`
   component to the desired sidebar array. Follow the site's existing plugin import convention. A
   typical layout entry is:

   ```ts
   ExternalPlugin.TagExplorer({ title: "Tags", showUntagged: false });
   ```

   Keep the site's existing responsive wrappers and native Explorer unless the requested design says
   otherwise.

4. Use slash-delimited nested tags in Markdown frontmatter:

   ```yaml
   tags:
     - guide/typescript
     - projects/client
   ```

   This renders folders such as `guide > typescript` and `projects > client`. A page appears under
   every tag path it declares. Tags may optionally begin with `#`.

5. Run the website's normal validation command and build. Confirm that the component appears in the
   intended layout position, folders can be collapsed, links navigate correctly, and SPA navigation
   does not duplicate the tree.

## Constraints

- The component reads Quartz's generated `contentIndex.json` through `fetchData` in the browser.
- It is a component plugin; do not add it to `transformers`, `filters`, or `emitters`.
- Preserve the website's existing visual language and layout wrappers.
- Set `showUntagged: true` only when the website needs an explicit untagged folder.
