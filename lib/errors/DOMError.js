/**
 * Author: Karl Bennett
 */

var MESSAGE = 'Page not found.';

/**
 * Returns a new Error that indicates that the requested page cannot be found.
 * 
 * @param request - the Node.js server request object.
 * @param response - the Node.js server response object.
 * @returns an new Error that can be thrown.
 */
function PageNotFoundError (request, response) {

    var error = new Error(MESSAGE);

    error.name = 'PageNotFoundError';
    error.code = 404;
    error.request = request;
    error.response = response;
    
    return error;
};

module.exports = PageNotFoundError;
module.exports.MESSAGE = MESSAGE;
