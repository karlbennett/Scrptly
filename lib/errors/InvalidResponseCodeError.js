/**
 * Author: Karl Bennett
 */

var MESSAGE = 'The response code is invalid for the requested page.';

/**
 * Returns a new Error that indicates that an incorrect response code has been 
 * returned by an HTTP client request.
 * 
 * @param request - the Node.js server request object.
 * @param response - the Node.js server response object.
 * @param url - the url that had been requested.
 * @param statusCode - the invalid HTTP response code that was recieved.
 * @returns an new Error that can be thrown.
 */
function InvalidResponseCodeError (request, response, url, statusCode) {

    var error = new Error(MESSAGE + 
        ' URL: [' + url + '] Status code: [' + statusCode + ']');

    error.name = 'InvalidResponseCodeError';
    error.code = 400;
    error.request = request;
    error.response = response;
    error.url = url;
    error.statusCode = statusCode;
    
    return error;
};

module.exports = InvalidResponseCodeError;
module.exports.MESSAGE = MESSAGE;
