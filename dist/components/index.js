import { createRequire } from 'module';

createRequire(import.meta.url);

// src/components/styles/tag-explorer.scss
var tag_explorer_default = '@charset "UTF-8";\n.tag-explorer {\n  color: var(--dark, #242424);\n  font-size: 0.95rem;\n}\n\n.tag-explorer__summary {\n  display: block;\n  margin: 0 0 0.5rem;\n  cursor: pointer;\n  font-size: 1.1rem;\n  font-weight: 600;\n  list-style: none;\n}\n\n.tag-explorer__summary::-webkit-details-marker {\n  display: none;\n}\n\n.tag-explorer__summary::after {\n  content: "";\n  display: inline-block;\n  width: 0.45rem;\n  height: 0.45rem;\n  margin: 0 0 0.15rem 0.55rem;\n  border-right: 2px solid currentColor;\n  border-bottom: 2px solid currentColor;\n  transform: rotate(45deg);\n  transition: transform 150ms ease;\n}\n\n.tag-explorer:not([open]) .tag-explorer__summary {\n  margin-bottom: 0;\n}\n\n.tag-explorer:not([open]) .tag-explorer__summary::after {\n  transform: rotate(-45deg);\n}\n\n.tag-explorer__list {\n  margin: 0;\n  padding-left: 1rem;\n  list-style: none;\n}\n\n.tag-explorer > nav > .tag-explorer__list {\n  max-height: 18rem;\n  overflow-y: auto;\n}\n\n.tag-explorer__folder > .tag-explorer__list {\n  border-left: 1px solid color-mix(in srgb, currentColor 22%, transparent);\n}\n\n.tag-explorer__toggle {\n  padding: 0.2rem 0;\n  border: 0;\n  background: none;\n  color: inherit;\n  cursor: pointer;\n  font: inherit;\n  text-align: left;\n}\n\n.tag-explorer__toggle::before {\n  content: "\u25BE";\n  display: inline-block;\n  width: 1rem;\n}\n\n.tag-explorer__toggle[aria-expanded=false]::before {\n  content: "\u25B8";\n}\n\n.tag-explorer__page,\n.tag-explorer__empty {\n  padding: 0.2rem 0;\n}';

// src/components/scripts/tag-explorer.inline.ts
var tag_explorer_inline_default = 'function u(n){return typeof n!="string"?[]:n.trim().replace(/^#/,"").split(/[\\\\/]/).map(e=>e.trim()).filter(Boolean)}function m(n){let e={name:"",pages:[],children:[]};for(let t of n){if(!t.slug)continue;let r={slug:t.slug,title:t.title||t.slug},l=Array.isArray(t.tags)?t.tags.map(u).filter(a=>a.length):[];for(let a of l){let s=e;for(let i of a){let c=s.children.find(f=>f.name===i);c||(c={name:i,pages:[],children:[]},s.children.push(c)),s=c}s.pages.push(r)}}let o=t=>{t.sort((r,l)=>r.name.localeCompare(l.name));for(let r of t)r.pages.sort((l,a)=>l.title.localeCompare(a.title)),o(r.children)};return o(e.children),e}function h(n){return Array.isArray(n)?n:Object.entries(n||{}).map(([e,o])=>({slug:e,...o}))}function x(n){let e=document.createElement("a");return e.href=`/${String(n.slug).replace(/^\\/+/,"")}`,e.textContent=n.title||n.slug,e}function g(n){let e=document.createElement("ul");e.className="tag-explorer__list";for(let o of n.children||[]){let t=document.createElement("li");t.className="tag-explorer__folder";let r=document.createElement("button");r.type="button",r.className="tag-explorer__toggle",r.setAttribute("aria-expanded","false"),r.textContent=o.name;let l=g(o);l.hidden=!0,r.addEventListener("click",()=>{let a=r.getAttribute("aria-expanded")==="true";r.setAttribute("aria-expanded",String(!a)),l.hidden=a}),t.append(r,l),e.append(t)}for(let o of n.pages||[]){let t=document.createElement("li");t.className="tag-explorer__page",t.append(x(o)),e.append(t)}return e}async function p(){let n=document.querySelectorAll("[data-tag-explorer]");if(!n.length)return;let e;try{e=await fetchData}catch{e=null}for(let o of n){let t=o.querySelector("[data-tag-explorer-status]");if(!t)continue;let r=h(e).filter(a=>a&&a.slug),l=m(r);if(o.dataset.showUntagged==="true"){let a=r.filter(s=>!Array.isArray(s.tags)||!s.tags.some(i=>u(i).length));a.length&&l.children.push({name:o.dataset.untaggedLabel||"Untagged",pages:a,children:[]})}t.replaceWith(g(l))}}var d=()=>p();document.addEventListener("nav",d);document.addEventListener("render",d);typeof window<"u"&&window.addCleanup&&window.addCleanup(()=>{document.removeEventListener("nav",d),document.removeEventListener("render",d)});p();\n';
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/TagExplorer.tsx
var TagExplorer_default = ((options) => {
  const {
    title = "Tags",
    showUntagged = false,
    untaggedLabel = "Untagged",
    className = "tag-explorer"
  } = options ?? {};
  const Component = ({ fileData }) => /* @__PURE__ */ u2(
    "details",
    {
      class: className,
      "data-tag-explorer": true,
      "data-show-untagged": showUntagged ? "true" : "false",
      "data-untagged-label": untaggedLabel,
      open: !fileData.toc?.length,
      children: [
        /* @__PURE__ */ u2("summary", { class: "tag-explorer__summary", children: /* @__PURE__ */ u2("span", { children: title }) }),
        /* @__PURE__ */ u2("nav", { "aria-label": title, children: /* @__PURE__ */ u2("div", { class: "tag-explorer__status", "data-tag-explorer-status": true, children: "Loading tags..." }) })
      ]
    }
  );
  Component.css = tag_explorer_default;
  Component.afterDOMLoaded = tag_explorer_inline_default;
  return Component;
});

export { TagExplorer_default as TagExplorer };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map