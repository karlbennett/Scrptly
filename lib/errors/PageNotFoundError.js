/**
 * Author: Karl Bennett
 */

var MESSAGE = 'Page not found.';

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
