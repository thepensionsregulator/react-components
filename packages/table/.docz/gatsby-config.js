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
    title: 'Table',
    description: 'TPR Table component and helpers',
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
          'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\.docz',
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
        title: 'Table',
        description: 'TPR Table component and helpers',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table',
          templates:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\node_modules\\docz-core\\dist\\templates',
          docz:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\.docz',
          cache:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\.docz\\.cache',
          app:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\.docz\\app',
          appPackageJson:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\package.json',
          gatsbyConfig:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\gatsby-config.js',
          gatsbyBrowser:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\gatsby-browser.js',
          gatsbyNode:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\gatsby-node.js',
          gatsbySSR:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\gatsby-ssr.js',
          importsJs:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\.docz\\app\\imports.js',
          rootJs:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\.docz\\app\\root.jsx',
          indexJs:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\.docz\\app\\index.jsx',
          indexHtml:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\.docz\\app\\index.html',
          db:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\table\\.docz\\app\\db.json',
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
