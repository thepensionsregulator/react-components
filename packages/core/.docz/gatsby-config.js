const { mergeWith } = require('lodash/fp')

let custom
try {
  custom = require('./gatsby-config.custom')
} catch (err) {
  custom = {}
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
          'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\.docz',
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
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core',
          templates:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\node_modules\\docz-core\\dist\\templates',
          docz:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\.docz',
          cache:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\.docz\\.cache',
          app:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\.docz\\app',
          appPackageJson:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\package.json',
          gatsbyConfig:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\gatsby-config.js',
          gatsbyBrowser:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\gatsby-browser.js',
          gatsbyNode:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\gatsby-node.js',
          gatsbySSR:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\gatsby-ssr.js',
          importsJs:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\.docz\\app\\imports.js',
          rootJs:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\.docz\\app\\root.jsx',
          indexJs:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\.docz\\app\\index.jsx',
          indexHtml:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\.docz\\app\\index.html',
          db:
            'C:\\Users\\aleknad\\Development\\tpr\\react-components\\packages\\core\\.docz\\app\\db.json',
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
