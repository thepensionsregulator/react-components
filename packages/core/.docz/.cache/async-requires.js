// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---readme-md": () => import("../../README.md" /* webpackChunkName: "component---readme-md" */),
  "component---src-components-toolbar-toolbar-mdx": () => import("../../src/components/toolbar/toolbar.mdx" /* webpackChunkName: "component---src-components-toolbar-toolbar-mdx" */),
  "component---src-components-buttons-buttons-mdx": () => import("../../src/components/buttons/buttons.mdx" /* webpackChunkName: "component---src-components-buttons-buttons-mdx" */),
  "component---src-pages-404-js": () => import("../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */)
}

