/**
 * Author: Karl Bennett
 */

var MESSAGE = 'The response code is invalid for the requested page.';

function InvalidResponseCodeError (request, response, url) {

    var error = new Error(MESSAGE + ' URL: ' + url);

    error.name = 'InvalidResponseCodeError';
    error.code = 400;
    error.request = request;
    error.response = response;
    error.url = url;
    
    return error;
};

module.exports = InvalidResponseCodeError;
module.exports.MESSAGE = MESSAGE;
