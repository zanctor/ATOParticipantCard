const _ = require('lodash');
const express = require('express');

module.exports = class HttpRouter {

	constructor(router, routeName) {
		this.router = router;
		this.routeName = routeName;
	}

	methodCall(method, args) {
		args = [].slice.call(args, 0);
		const cb = _.last(args);
		const url = _.first(args);
		const middlewares = _.flatten(args.slice(1, args.length - 1));
		[].unshift.call(middlewares, ...this.router.usedMiddlewares[this.routeName]);
		this.router.expressRouter[method](url, ...middlewares, cb);
	}

	post() {
		this.methodCall('post', arguments);
	}

	get() {
		this.methodCall('get', arguments);
	}

	patch() {
		this.methodCall('patch', arguments);
	}

	delete() {
		this.methodCall('delete', arguments);
	}

};