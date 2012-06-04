/**
 * Author: Karl Bennett
 */

var assert = require('assert');


var equal = assert.equal;
var deepEqual = assert.deepEqual;


/**
 * Constant test values.
 */
var TEST_CODE = 200;
var TEST_HEADERS = {'Test-Header': 'test'};
var CONTENT_TYPE = {'Content-Type': 'text/plain'};
var TEST_BODY = 'test body text';

/**
 * A mock Node.js response object that can be used to test interations.
 * 
 * The mocked response also contains call flags for each mocked method. The 
 * convention for the naming of these flags is as follows.
 * 
 * Flag name: <method name>Called
 * 
 * @param code - the HTTP response code e.g. 200, 404, 500...
 * @param headers - a map of HTTP header key value pairs.
 * @param body - the body data to be written to the response.
 * @returns an object containing mocks and call flags for the response methods.
 */
function MockResponse(code, headers, body) {

    return {
        
        'writeHead': function (codeArg, headersArg) {

            equal(codeArg, code, 'http code should be correct');
            deepEqual(headersArg, headers, 'http headers chould be correct');
            
            this.writeHeadCalled = true;
        },
        
        'writeHeadCalled': false,
            
        'write': function (bodyArg) {

            equal(bodyArg, body, 'response body should be correct');
            
            this.writeCalled = true;
        },
        
        'writeCalled': false,
            
        'end': function () {

            this.endCalled = true;
        },
        
        'endCalled': false
    };
};

module.exports = MockResponse;
module.exports.TEST_CODE = TEST_CODE;
module.exports.TEST_HEADERS = TEST_HEADERS;
module.exports.CONTENT_TYPE = CONTENT_TYPE;
module.exports.TEST_BODY = TEST_BODY;