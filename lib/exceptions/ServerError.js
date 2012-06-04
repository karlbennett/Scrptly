/**
 * Author: Karl Bennett
 */

function ServerError (request, response) {

    var error = new Error('Internal server error.');

    error.name = 'ServerError';
    error.request = request;
    error.response = response;
    
    return error;
};

module.exports = PageNotFoundError;