const { mergeWith } = require('lodash/fp')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Monorepo',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: '/home/alekna/Development/tpr/react-components/.docz',
        base: '/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Monorepo',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/home/alekna/Development/tpr/react-components',
          templates:
            '/home/alekna/Development/tpr/react-components/node_modules/docz-core/dist/templates',
          docz: '/home/alekna/Development/tpr/react-components/.docz',
          cache: '/home/alekna/Development/tpr/react-components/.docz/.cache',
          app: '/home/alekna/Development/tpr/react-components/.docz/app',
          appPackageJson:
            '/home/alekna/Development/tpr/react-components/package.json',
          gatsbyConfig:
            '/home/alekna/Development/tpr/react-components/gatsby-config.js',
          gatsbyBrowser:
            '/home/alekna/Development/tpr/react-components/gatsby-browser.js',
          gatsbyNode:
            '/home/alekna/Development/tpr/react-components/gatsby-node.js',
          gatsbySSR:
            '/home/alekna/Development/tpr/react-components/gatsby-ssr.js',
          importsJs:
            '/home/alekna/Development/tpr/react-components/.docz/app/imports.js',
          rootJs:
            '/home/alekna/Development/tpr/react-components/.docz/app/root.jsx',
          indexJs:
            '/home/alekna/Development/tpr/react-components/.docz/app/index.jsx',
          indexHtml:
            '/home/alekna/Development/tpr/react-components/.docz/app/index.html',
          db: '/home/alekna/Development/tpr/react-components/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
