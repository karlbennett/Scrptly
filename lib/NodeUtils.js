/**
 * Author: Karl Bennett
 */

/**
 * Write to a Node.js response object.
 * 
 * @param response - the Node.js response object.
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
 * @param response - the Node.js response object.
 * @param code - the HTTP response code e.g. 200, 404, 500...
 * @param string - the string to be written to the response body.
 */
function writeStringResponse(response, code, string) {

    writeResponse(response, code, {'Content-Type': 'text/plain'}, string);
};


exports.writeResponse = writeResponse;
exports.writeStringResponse = writeStringResponse;
