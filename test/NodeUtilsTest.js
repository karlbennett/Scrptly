/**
 * Author: Karl Bennett
 */

var nodeUtils = require('../lib/NodeUtils');
var assert = require('assert');


var ok = assert.ok;
var equal = assert.equal;
var deepEqual = assert.deepEqual;


var TEST_CODE = 200;
var TEST_HEADERS = {'Test-Header': 'test'};
var CONTENT_TYPE = {'Content-Type': 'text/plain'};
var TEST_BODY = 'test body text';


function testResponse(code, headers, body) {

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


var tests = {

    'testWriteResponse': function () {

        var response = testResponse(TEST_CODE, TEST_HEADERS, TEST_BODY);
        
        nodeUtils.writeResponse(response, TEST_CODE, TEST_HEADERS, TEST_BODY);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testWriteResponseWithNullValues': function () {

        var response = testResponse(null, null, null);
        
        nodeUtils.writeResponse(response, null, null, null);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testWriteStringResponse': function () {

        var response = testResponse(TEST_CODE, CONTENT_TYPE, TEST_BODY);
        
        nodeUtils.writeStringResponse(response, TEST_CODE, TEST_BODY);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testWriteStringResponseWithNullValues': function () {

        var response = testResponse(null, CONTENT_TYPE, null);
        
        nodeUtils.writeStringResponse(response, null, null);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    }
}

module.exports = tests;