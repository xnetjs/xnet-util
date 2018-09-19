"use strict";

exports.isArray = function isArray(arg) {
	if (Array.isArray) {
		return Array.isArray(arg);
	}
	return objectToString(arg) === "[object Array]";
};

exports.isBoolean = function isBoolean(arg) {
	return typeof arg === "boolean";
};

exports.isNull = function isNull(arg) {
	return arg === null;
};

exports.isNullOrUndefined = function isNullOrUndefined(arg) {
	return arg == null;
};

exports.isNumber = function isNumber(arg) {
	return typeof arg === "number";
};

exports.isString = function isString(arg) {
	return typeof arg === "string";
};

exports.isSymbol = function isSymbol(arg) {
	return typeof arg === "symbol";
};

exports.isUndefined = function isUndefined(arg) {
	return arg === void 0;
};

exports.isRegExp = function isRegExp(re) {
	return objectToString(re) === "[object RegExp]";
};

exports.isObject = function isObject(arg) {
	return typeof arg === "object" && arg !== null;
};

exports.isDate = function isDate(d) {
	return objectToString(d) === "[object Date]";
};

exports.isError = function isError(e) {
	return objectToString(e) === "[object Error]" || e instanceof Error;
};

exports.isFunction = function isFunction(arg) {
	return typeof arg === "function";
};
exports.isAsyncFunction = function isAsyncFunction(arg) {
	return exports.isFunction(arg) && arg.constructor.name === "AsyncFunction";
};

exports.isPrimitive = function isPrimitive(arg) {
	return (
		arg === null ||
		typeof arg === "boolean" ||
		typeof arg === "number" ||
		typeof arg === "string" ||
		typeof arg === "symbol" || // ES6 symbol
		typeof arg === "undefined"
	);
};

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
	return Object.prototype.toString.call(o);
}
