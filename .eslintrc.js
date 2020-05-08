module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'commonjs': true,
		'node': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'prettier',
		'prettier/react'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	parser: 'babel-eslint',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 11,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'react/jsx-filename-extension': [
		  'warn',
		  {extensions: ['.js', '.jsx']}
		],
		'import/prefer-default-export': 'off',
		'jsx-quotes': ['error', 'prefer-single']
	}
}
