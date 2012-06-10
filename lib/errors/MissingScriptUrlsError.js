/**
 * Author: Karl Bennett
 */

var MESSAGE = 'No JavaScript script urls were supplied.';

/**
 * Returns a new Error that indicates that the script urls were not supplied 
 * within the body of the request.
 * 
 * @param request - the Node.js server request object.
 * @param response - the Node.js server response object.
 * @returns an new Error that can be thrown.
 */
function MissingScriptUrlsError (request, response) {

    var error = new Error(MESSAGE);

    error.name = 'MissingScriptUrlsError';
    error.code = 400;
    error.request = request;
    error.response = response;
    
    return error;
};

module.exports = MissingScriptUrlsError;
module.exports.MESSAGE = MESSAGE;
