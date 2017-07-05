const _ = require('lodash');
const express = require('express');
const HttpRouter = require('./httpRouter');

module.exports = class Router {

	constructor(routes, middlewares = []) {
		this.middlewares = middlewares;
		this.routes = routes;
		this.usedMiddlewares = {};
		this.expressRouter = express.Router();
		this.app = null;
	}

	setApp(app) {
		this.app = app;
		return this;
	}

	use(routeName) {
		this.usedMiddlewares[routeName] = [(req, res, next) => next()];

		this.middlewares.forEach(middlewareConfig => {
			const isFunctionMiddlewareConfig =  _.isFunction(middlewareConfig);
			let middleware = isFunctionMiddlewareConfig ? middlewareConfig : middlewareConfig.middleware;
			middleware = !_.isArray(middleware) ? [middleware] : middleware;

			const excludedRoutes = isFunctionMiddlewareConfig ? [] :
				(_.isString(middlewareConfig.exclude) ? [middlewareConfig.exclude] : middlewareConfig.exclude);

			if (!excludedRoutes.includes(routeName) && !this.usedMiddlewares[routeName].includes(middleware)) {
				this.usedMiddlewares[routeName].push.call(this.usedMiddlewares[routeName], ...middleware);
			}
		});
	}

	loadRoutes() {
		Object.keys(this.routes).forEach(routeName => {
			this.use(routeName);
			this.routes[routeName](new HttpRouter(this, routeName));
		});
		this.app.use('/api', this.expressRouter);
	}

};