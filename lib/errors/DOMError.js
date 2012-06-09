/**
 * Author: Karl Bennett
 */

var MESSAGE = 'Error parsing the DOM.';

/**
 * Returns a new Error that indicates that the DOM could not be created 
 * successfully from the supplied HTML.
 * 
 * @param request - the Node.js server request object.
 * @param response - the Node.js server response object.
 * @param errors - the errors encountered when parsing the HTML into the DOM 
 *      object.
 * @returns an new Error that can be thrown.
 */
function DOMError (request, response, errors) {

    var error = new Error(MESSAGE + ' Errors: ' + errors);

    error.name = 'DOMError';
    error.code = 404;
    error.request = request;
    error.response = response;
    error.errors = errors;
    
    return error;
};

module.exports = DOMError;
module.exports.MESSAGE = MESSAGE;
