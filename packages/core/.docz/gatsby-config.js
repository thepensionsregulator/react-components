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
    title: 'Core',
    description: 'TPR Core components',
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
        root:
          '/Users/davidalekna/Development/tpr/react-components/packages/core/.docz',
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
        title: 'Core',
        description: 'TPR Core components',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root:
            '/Users/davidalekna/Development/tpr/react-components/packages/core',
          templates:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/node_modules/docz-core/dist/templates',
          docz:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/.docz',
          cache:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/.docz/.cache',
          app:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/.docz/app',
          appPackageJson:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/package.json',
          gatsbyConfig:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/gatsby-config.js',
          gatsbyBrowser:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/gatsby-browser.js',
          gatsbyNode:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/gatsby-node.js',
          gatsbySSR:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/gatsby-ssr.js',
          importsJs:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/.docz/app/imports.js',
          rootJs:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/.docz/app/root.jsx',
          indexJs:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/.docz/app/index.jsx',
          indexHtml:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/.docz/app/index.html',
          db:
            '/Users/davidalekna/Development/tpr/react-components/packages/core/.docz/app/db.json',
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
