/**
 * Author: Karl Bennett
 */

var MESSAGE = 'The format of the body supplied with the request is invalid.';

/**
 * Returns a new Error that indicates that format of the request body is invalid.
 * 
 * @param request - the Node.js server request object.
 * @param response - the Node.js server response object.
 * @param expected - an example of what should be in the request body.
 * @param body - the invalid body string that was supplied with the request.
 * @returns an new Error that can be thrown.
 */
function InvalidBodyFormatError (request, response, expected, body) {

    var error = new Error(MESSAGE + '\nExpected:\n' + expected + '\nActual:\n' + body);

    error.name = 'InvalidBodyFormatError';
    error.code = 400;
    error.request = request;
    error.response = response;
    error.expected = expected;
    error.body = body;
    
    return error;
};

module.exports = InvalidBodyFormatError;
module.exports.MESSAGE = MESSAGE;
