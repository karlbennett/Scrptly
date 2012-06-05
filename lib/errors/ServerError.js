/**
 * Author: Karl Bennett
 */

var MESSAGE = 'Internal server error.';

/**
 * Returns a new Error that indicates generic internal server error.
 * 
 * @param request - the Node.js server request object.
 * @param response - the Node.js server response object.
 * @returns an new Error that can be thrown.
 */
function ServerError (request, response) {

    var error = new Error(MESSAGE);

    error.name = 'ServerError';
    error.code = 500;
    error.request = request;
    error.response = response;
    
    return error;
};

module.exports = ServerError;
module.exports.MESSAGE = MESSAGE;
