/**
 * Author: Karl Bennett
 */

var MESSAGE = 'Required parameters missing.';

function MissingRequestParameterError (request, response, parameters) {

    var error = new Error(MESSAGE + ' Missing parameters: ' + parameters);

    error.name = 'MissingRequestParameterError';
    error.code = 400;
    error.request = request;
    error.response = response;
    error.parameters = parameters;
    
    return error;
};

module.exports = MissingRequestParameterError;
module.exports.MESSAGE = MESSAGE;
