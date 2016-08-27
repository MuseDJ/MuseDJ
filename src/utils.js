'use strict';

let Utils = {};

Utils.getErrorCode = (err) => {
	// TODO implement error codes
	let errorMap = {};
	return errorMap[err.message] | -1;
};

Utils.getErrorObject = (err) => {
	return {
		error: true,
		message: err.message,
		errorcode: Utils.getErrorCode(err),
		timestamp: Date.now()
	};
};

module.exports = Utils;
