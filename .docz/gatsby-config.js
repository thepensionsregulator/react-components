const { mergeWith } = require('docz-utils')
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
    title: 'TPR React Components',
    description: 'React Components reused across the apps',
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
        themeConfig: { mode: 'light', showDarkModeSwitch: false },
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: ['Home', 'Core', 'Forms', 'Layout'],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [
          'CHANGELOG.md',
          'CODE_OF_CONDUCT.md',
          'CONTRIBUTING.md',
          'LICENSE.md',
          'README.md',
        ],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: 'C:\\dev\\github\\react-components\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'TPR React Components',
        description: 'React Components reused across the apps',
        host: 'localhost',
        port: 6006,
        p: 3000,
        separator: '-',
        paths: {
          root: 'C:\\dev\\github\\react-components',
          templates:
            'C:\\dev\\github\\react-components\\node_modules\\docz-core\\dist\\templates',
          docz: 'C:\\dev\\github\\react-components\\.docz',
          cache: 'C:\\dev\\github\\react-components\\.docz\\.cache',
          app: 'C:\\dev\\github\\react-components\\.docz\\app',
          appPackageJson: 'C:\\dev\\github\\react-components\\package.json',
          appTsConfig: 'C:\\dev\\github\\react-components\\tsconfig.json',
          gatsbyConfig: 'C:\\dev\\github\\react-components\\gatsby-config.js',
          gatsbyBrowser: 'C:\\dev\\github\\react-components\\gatsby-browser.js',
          gatsbyNode: 'C:\\dev\\github\\react-components\\gatsby-node.js',
          gatsbySSR: 'C:\\dev\\github\\react-components\\gatsby-ssr.js',
          importsJs:
            'C:\\dev\\github\\react-components\\.docz\\app\\imports.js',
          rootJs: 'C:\\dev\\github\\react-components\\.docz\\app\\root.jsx',
          indexJs: 'C:\\dev\\github\\react-components\\.docz\\app\\index.jsx',
          indexHtml:
            'C:\\dev\\github\\react-components\\.docz\\app\\index.html',
          db: 'C:\\dev\\github\\react-components\\.docz\\app\\db.json',
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
