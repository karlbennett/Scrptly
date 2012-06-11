/**
 * Author: Karl Bennett
 */


/**
 * Returns a new Error that indicates that the file at the supplied uri could 
 * not be concatenated.
 * 
 * @param message - the message for this error.
 * @param uri - the uri of the file that could not be concatenated.
 * @returns an new Error that can be thrown.
 */
function ConcatenationError (message, uri) {

    var error = new Error(message);

    error.name = 'ConcatenationError';
    error.uri = uri;
    
    return error;
};

module.exports = ConcatenationError;
