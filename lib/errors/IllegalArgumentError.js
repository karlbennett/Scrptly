/**
 * Author: Karl Bennett
 */

/**
 * Returns a new Error that indicates that an illegal argument has been passed 
 * to a function.
 * 
 * @param request - the Node.js server request object.
 * @param response - the Node.js server response object.
 * @param argument - the name of the illegal arguemnt.
 * @returns an new Error that can be thrown.
 */
function IllegalArgumentError (request, response, message, argument) {

    var error = new Error(message + ' Argument: ' + argument);

    error.name = 'IllegalArgumentError';
    error.code = 500;
    error.request = request;
    error.response = response;
    error.argument = argument;
    
    return error;
};

module.exports = IllegalArgumentError;
