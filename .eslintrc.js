require( "@rushstack/eslint-patch/modern-module-resolution" );

module.exports = {
	ignorePatterns: [
		"/node_modules",
		"type-detector.min.js",
		"type-detector.esm.min.js",
		"/test/qunit"
	],
	root: true,
	env: {
		browser: true,
		es2024: true,
		worker: true,
		node: true
	},
	extends: [
		"eslint:recommended"
	],
	parserOptions: {
		ecmaVersion: "latest",
		ecmaFeatures: {
			globalReturn: false,
			impliedStrict: true
		},
		sourceType: "module"
	},
	rules: {
		"arrow-body-style": [ 1, "as-needed" ],
		"array-bracket-spacing": [ 2, "always" ],
		"arrow-parens": [ 1, "as-needed" ],
		"arrow-spacing": [
			1,
			{
				before: true,
				after: true
			}
		],
		"block-spacing": [ 2, "always" ],
		"brace-style": [ 2, "1tbs" ],
		"comma-dangle": [ 2, "never" ],
		"comma-spacing": [
			2,
			{
				before: false,
				after: true
			}
		],
		"computed-property-spacing": [ 2, "always" ],
		"curly": [ 2, "all" ],
		"eqeqeq": [ 2, "always" ],
		"func-call-spacing": [ 2, "never" ],
		"key-spacing": [
			2,
			{
				beforeColon: false,
				afterColon: true
			}
		],
		"lines-around-comment": [
			2,
			{
				beforeLineComment: true
			}
		],
		"linebreak-style": [ "off", "windows" ],
		"max-statements-per-line": [
			"error",
			{
				max: 3
			}
		],
		"no-alert": 2,
		"no-await-in-loop": 2,
		"no-caller": 2,
		"no-class-assign": 2,
		"no-confusing-arrow": [
			2,
			{
				allowParens: true
			}
		],
		"no-const-assign": 2,
		"no-delete-var": 2,
		"no-dupe-args": 2,
		"no-dupe-keys": 2,
		"no-duplicate-case": 2,
		"no-duplicate-imports": [
			2,
			{
				includeExports: true
			}
		],
		"no-empty-character-class": 2,
		"no-eq-null": 2,
		"no-eval": 2,
		"no-extend-native": 2,
		"no-extra-bind": 2,
		"no-extra-label": 2,
		"no-extra-semi": 2,
		"no-floating-decimal": 2,
		"no-labels": 2,
		"no-lone-blocks": 2,
		"no-implicit-coercion": 0,
		"no-implied-eval": 2,
		"no-inline-comments": 2,
		"no-irregular-whitespace": 0,
		"no-mixed-spaces-and-tabs": 2,
		"no-multi-assign": 2,
		"no-multiple-empty-lines": [
			2,
			{
				max: 1
			}
		],
		"no-multi-spaces": 2,
		"no-multi-str": 2,
		"no-native-reassign": 2,
		"no-new": 0,
		"no-new-object": 2,
		"no-new-require": 2,
		"no-proto": 2,
		"no-return-assign": 2,
		"no-undef": 2,
		"no-undef-init": 2,
		"no-undefined": 0,
		"no-unused-vars": 0,
		"no-useless-computed-key": 2,
		"no-useless-rename": 2,
		"no-var": 2,
		"prefer-rest-params": 2,
		"prefer-template": 1,
		"quotes": [ 2, "double" ],
		"rest-spread-spacing": [ 1, "never" ],
		"semi-spacing": [
			2,
			{
				before: false,
				after: true
			}
		],
		"semi-style": [ 2, "last" ],
		"space-before-function-paren": [ 2, "always" ],
		"space-before-blocks": [ 2, "always" ],
		"space-in-parens": [ 2, "always" ],
		"spaced-comment": [ 2, "always" ],
		"space-infix-ops": 2,
		"switch-colon-spacing": [
			2,
			{
				after: true
			}
		],
		"template-curly-spacing": [ 1, "always" ]
	},
	globals: {
		window: true,
		document: true,
		export: true,
		define: true,
		TD: true
	}
}