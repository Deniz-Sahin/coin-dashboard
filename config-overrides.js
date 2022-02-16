const path = require("path");
const fs = require("fs");
const {
	override,
	babelInclude,
	addDecoratorsLegacy,
	disableEsLint,
	removeModuleScopePlugin,
} = require("customize-cra");

//const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function (config, env) {

	let paths = [path.resolve("src")];

	return Object.assign(
		config,
		override(
			removeModuleScopePlugin(),
			disableEsLint(),
			addDecoratorsLegacy(),
			babelInclude(paths)
		)(config, env)
	);
};
