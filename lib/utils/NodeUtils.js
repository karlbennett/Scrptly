/**
 * Author: Karl Bennett
 */

var utils = require('./Utils');


var isBlank = utils.isBlank;
var isNotBlank = utils.isNotBlank;


/**
 * Extract the any values from the supplied parameter map that have keys 
 * matching the values within the supplied parameter name array.
 * 
 * @param parameters - a map of parameter key/value pairs.
 * @param paramNames - an array of required parameter names.
 * @return an array of required parameter values.
 */
function extractParameterValues (parameters, paramNames) {

    if (isBlank(parameters)) return [];

    var values = [];

    var value;
    for (i in paramNames) {
        
        value = parameters[paramNames[i]];
        
        if (isNotBlank(value)) values.push(value);
    }
    
    return values;
};

/**
 * Find any parameter names that are not within the supplied parameter maps key 
 * set.
 * 
 * @param parameters - a map of parameter key/value pairs.
 * @param paramNames - an array of required parameter names.
 * @return an array of missing parameter names.
 */
function findMissingParameterNames (parameters, paramNames) {
  
    if (isBlank(parameters)) return paramNames;

    var names = [];

    var value;
    for (i in paramNames) {
        
        value = parameters[paramNames[i]];
        
        if (isBlank(value)) names.push(paramNames[i]);
    }
    
    return names;
};

/**
 * Write to a Node.js response object.
 * 
 * @param response - the Node.js server response object.
 * @param code - the HTTP response code e.g. 200, 404, 500...
 * @param headers - a map of HTTP header key value pairs.
 * @param body - the body data to be written to the response.
 */
function writeResponse(response, code, headers, body) {

    response.writeHead(code, headers);
    response.write(body);
    response.end();
};

/**
 * Write a string to a Node.js response object. Because the response body is a 
 * string the 'Content-Type' is automatically set 'text/plain'.
 * 
 * @param response - the Node.js server response object.
 * @param code - the HTTP response code e.g. 200, 404, 500...
 * @param string - the string to be written to the response body.
 */
function writeStringResponse(response, code, string) {

    writeResponse(response, code, {'Content-Type': 'text/plain'}, string);
};


exports.extractParameterValues = extractParameterValues;
exports.findMissingParameterNames = findMissingParameterNames;
exports.writeResponse = writeResponse;
exports.writeStringResponse = writeStringResponse;
