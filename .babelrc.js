const plugins = [
  [
    'babel-plugin-import',
    {
      'libraryName': '@material-ui/core',
      // Use "'libraryDirectory': ''," se o seu bundler não suportar módulos ES
      'libraryDirectory': 'esm',
      'camel2DashComponentName': false
    },
    'core'
  ],
  [
    'babel-plugin-import',
    {
      'libraryName': '@material-ui/icons',
      // Use "'libraryDirectory': ''," se o seu bundler não suportar módulos ES
      'libraryDirectory': 'esm',
      'camel2DashComponentName': false
    },
    'icons'
  ]
];

module.exports = {plugins};
