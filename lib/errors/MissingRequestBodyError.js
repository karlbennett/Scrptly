/**
 * Author: Karl Bennett
 */

var MESSAGE = 'Request body required.';

/**
 * Returns a new Error that indicates that the script urls were not supplied 
 * within the body of the request.
 * 
 * @param request - the Node.js server request object.
 * @param response - the Node.js server response object.
 * @param expected - an example template of what should be in the request body.
 * @returns an new Error that can be thrown.
 */
function MissingRequestBodyError (request, response, expected) {

    var error = new Error(MESSAGE + '\nExpected:\n' + expected);

    error.name = 'MissingRequestBodyError';
    error.code = 400;
    error.request = request;
    error.response = response;
    error.expected = expected;
    
    return error;
};

module.exports = MissingRequestBodyError;
module.exports.MESSAGE = MESSAGE;
