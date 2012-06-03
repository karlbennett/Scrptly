/**
 * Author: Karl Bennett
 */

var nodeUtils = require('../lib/NodeUtils');
var assert = require('assert');
var MockResponse = require('./MockResponse');


var ok = assert.ok;
var equal = assert.equal;
var deepEqual = assert.deepEqual;


var TEST_CODE = MockResponse.TEST_CODE;
var TEST_HEADERS = MockResponse.TEST_HEADERS;
var CONTENT_TYPE = MockResponse.CONTENT_TYPE;
var TEST_BODY = MockResponse.TEST_BODY;


var tests = {

    'testWriteResponse': function () {

        var response = MockResponse(TEST_CODE, TEST_HEADERS, TEST_BODY);
        
        nodeUtils.writeResponse(response, TEST_CODE, TEST_HEADERS, TEST_BODY);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testWriteResponseWithNullValues': function () {

        var response = MockResponse(null, null, null);
        
        nodeUtils.writeResponse(response, null, null, null);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testWriteStringResponse': function () {

        var response = MockResponse(TEST_CODE, CONTENT_TYPE, TEST_BODY);
        
        nodeUtils.writeStringResponse(response, TEST_CODE, TEST_BODY);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testWriteStringResponseWithNullValues': function () {

        var response = MockResponse(null, CONTENT_TYPE, null);
        
        nodeUtils.writeStringResponse(response, null, null);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    }
}

module.exports = tests;