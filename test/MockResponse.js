/**
 * Author: Karl Bennett
 */

var assert = require('assert');


var equal = assert.equal;
var deepEqual = assert.deepEqual;


var TEST_CODE = 200;
var TEST_HEADERS = {'Test-Header': 'test'};
var CONTENT_TYPE = {'Content-Type': 'text/plain'};
var TEST_BODY = 'test body text';


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