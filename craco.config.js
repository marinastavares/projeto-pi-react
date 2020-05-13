/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const path = require('path')
const fs = require('fs')

const postCSSNested = require('postcss-nested')
const autoprefixer = require('autoprefixer')
const postCssImport = require('postcss-import')
// eslint-disable-next-line import/order
const postCssPresetEnv = require('postcss-preset-env')

const CSS_MODULE_LOCAL_IDENT_NAME = '[local]___[hash:base64:5]'
const CracoLessPlugin = require('craco-less')
const rewireBabelLoader = require('craco-babel-loader')

// helpers

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = {
  style: {
    postcss: {
      modules: {
        localIdentName: CSS_MODULE_LOCAL_IDENT_NAME,
      },
      plugins: [
        postCSSNested,
        autoprefixer,
        postCssImport,
        postCssPresetEnv({
          browsers: 'last 2 versions',
          stage: 0,
        }),
      ],
      env: {
        stage: 3,
        features: {
          'nesting-rules': true,
        },
      },
    },
  },
  webpack: {
    alias: {
      utils: path.resolve(__dirname, 'src/utils/'),
      services: path.resolve(__dirname, 'src/services/'),
      modules: path.resolve(__dirname, 'src/modules/'),
      views: path.resolve(__dirname, 'src/views/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      styles: path.resolve(__dirname, 'src/styles/'),
    },
  },
  plugins: [
    // This is a craco plugin: https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-overview
    {
      plugin: rewireBabelLoader,
      options: {
        includes: [resolveApp('node_modules/isemail')], // put things you want to include in array here
        excludes: [/(node_modules|bower_components)/], // things you want to exclude here
        // you can omit include or exclude if you only want to use one option
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
        styleLoaderOptions: {},
      },
    },
  ],
  babel: {
    plugins: [
      [
        'babel-plugin-react-css-modules',
        {
          generateScopedName: CSS_MODULE_LOCAL_IDENT_NAME,
          attributeNames: { activeStyleName: 'activeClassName' },
        },
      ],
      ['@babel/plugin-proposal-optional-chaining'],
    ],
  },
}
