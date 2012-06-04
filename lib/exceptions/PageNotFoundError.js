/**
 * Author: Karl Bennett
 */

function PageNotFoundError (request, response) {

    var error = new Error('Page not found.');

    error.name = 'PageNotFoundError';
    error.code = 404;
    error.request = request;
    error.response = response;
    
    return error;
};

module.exports = PageNotFoundError;