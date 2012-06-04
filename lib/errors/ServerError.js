/**
 * Author: Karl Bennett
 */

var MESSAGE = 'Internal server error.';

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
