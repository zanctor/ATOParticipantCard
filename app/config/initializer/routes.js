const requireDir = require('require-dir');
const routesConfig = requireDir('../../routes');

module.exports = (app) => {
	Object.keys(routesConfig).forEach(domainName => {
		const routerConfig = routesConfig[domainName];
		routerConfig.setApp(app)
			.loadRoutes();
	});
};