/**
 * Author: Karl Bennett
 */

var MESSAGE = 'Required parameters missing.';

/**
 * Returns a new Error that indicates that some requered parameters are missing 
 * the from the HTTP request URI.
 * 
 * @param request - the Node.js server request object.
 * @param response - the Node.js server response object.
 * @param parameters - an array containing the names of the parameters that were 
 *          missing.
 * @returns an new Error that can be thrown.
 */
function MissingRequestParameterError (request, response, parameters) {

    var error = new Error(MESSAGE + ' Missing parameters: ' + parameters);

    error.name = 'MissingRequestParameterError';
    error.code = 400;
    error.request = request;
    error.response = response;
    error.parameters = parameters;
    
    return error;
};

module.exports = MissingRequestParameterError;
module.exports.MESSAGE = MESSAGE;
