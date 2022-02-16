class _Config {
	static getEnvVar(variableName) {
		if (window.env && window.env[variableName]) {
			return window.env[variableName];
		}
		return null;
	}

	getEnv(name) {
		return `${_Config.getEnvVar(name) ?? process.env[name]}`;
	}

	apiRoot() {
		return this.getEnv("API_ROOT");
	}

}

const Config = new _Config();

export default Config;
