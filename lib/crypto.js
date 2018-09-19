"use strict";

const crypto = require("crypto");

/**
 * hash
 *
 * @param {String} method hash method, e.g.: 'md5', 'sha1'
 * @param {String|Buffer} str
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
exports.hash = function hash(method, str, format) {
	let sum = crypto.createHash(method);
	let isBuffer = Buffer.isBuffer(str);
	if (!isBuffer && typeof str === "object") {
		str = JSON.stringify(sortObject(str));
	}
	sum.update(str, isBuffer ? "binary" : "utf8");
	return sum.digest(format || "hex");
};

/**
 * md5 hash
 *
 * @param {String|Buffer} str
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
exports.md5 = function md5(str, format) {
	return exports.hash("md5", str, format);
};

/**
 * sha1 hash
 *
 * @param {String|Buffer} str
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha1 hash string
 * @public
 */
exports.sha1 = function sha1(str, format) {
	return exports.hash("sha1", str, format);
};

/**
 * sha256 hash
 *
 * @param {String|Buffer} str
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha256 hash string
 * @public
 */
exports.sha256 = function sha1(str, format) {
	return exports.hash("sha256", str, format);
};

/**
 * HMAC algorithm.
 *
 * Equal bash:
 *
 * ```bash
 * $ echo -n "$data" | openssl dgst -binary -$algorithm -hmac "$key" | openssl $encoding
 * ```
 *
 * @param {String} algorithm, dependent on the available algorithms supported by the version of OpenSSL on the platform.
 *   Examples are 'sha1', 'md5', 'sha256', 'sha512', etc.
 *   On recent releases, `openssl list-message-digest-algorithms` will display the available digest algorithms.
 * @param {String} key, the hmac key to be used.
 * @param {String|Buffer} data, content string.
 * @param {String} [encoding='base64']
 * @return {String} digest string.
 */
exports.hmac = function hmac(algorithm, key, data, encoding) {
	encoding = encoding || "base64";
	let hmac = crypto.createHmac(algorithm, key);
	hmac.update(data, Buffer.isBuffer(data) ? "binary" : "utf8");
	return hmac.digest(encoding);
};

/**
 * Base64 encode string.
 *
 * @param {String|Buffer} str
 * @param {Boolean} [urlsafe=false] Encode string str using a URL-safe alphabet,
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @return {String} base64 encode format string.
 */
exports.base64encode = function base64encode(str, urlsafe) {
	if (!Buffer.isBuffer(str)) {
		str = new Buffer(str);
	}
	let encode = str.toString("base64");
	if (urlsafe) {
		encode = encode.replace(/\+/g, "-").replace(/\//g, "_");
	}
	return encode;
};

/**
 * Base64 string decode.
 *
 * @param {String} encode, base64 encoding string.
 * @param {Boolean} [urlsafe=false] Decode string str using a URL-safe alphabet,
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @param {encoding} [encoding=utf8] if encoding = buffer, will return Buffer instance
 * @return {String|Buffer} plain text.
 */
exports.base64decode = function base64decode(encodeStr, urlsafe, encoding) {
	if (urlsafe) {
		encodeStr = encodeStr.replace(/\-/g, "+").replace(/_/g, "/");
	}
	let buf = new Buffer(encodeStr, "base64");
	if (encoding === "buffer") {
		return buf;
	}
	return buf.toString(encoding || "utf8");
};

function sortObject(o) {
	if (!o || Array.isArray(o) || typeof o !== "object") {
		return o;
	}
	let keys = Object.keys(o);
	keys.sort();
	let values = [];
	for (let i = 0; i < keys.length; i++) {
		let k = keys[i];
		values.push([k, sortObject(o[k])]);
	}
	return values;
}
