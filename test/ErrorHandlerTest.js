/**
 * Author: Karl Bennett
 */

var ErrorHandler = require('../lib/ErrorHandler');
var assert = require('assert');
var MockResponse = require('./MockResponse');


var ok = assert.ok;
var equal = assert.equal;


var TEST_CODE = MockResponse.TEST_CODE;
var TEST_HEADERS = MockResponse.TEST_HEADERS;
var CONTENT_TYPE = MockResponse.CONTENT_TYPE;
var TEST_BODY = MockResponse.TEST_BODY;

var MESSAGE_404 = ErrorHandler.MESSAGE_404;
var MESSAGE_500 = ErrorHandler.MESSAGE_500;


var tests = {

    'testErrorHandler': function () {

        var callback = typeof ErrorHandler({});
        
        equal(callback, 'function', 'ErrorHandler should produce a callback');
    },
    
    'testErrorHandlerWithInvalidHandlerMap': function () {

        var callback = typeof ErrorHandler('not a handler map');
        
        equal(callback, 'function', 'ErrorHandler should produce a callback');
    },
    
    'testErrorHandlerWithNull': function () {

        var callback = typeof ErrorHandler(null);
        
        equal(callback, 'function', 'ErrorHandler should produce a callback');
    },
    
    'testErrorHandlerWithUndefined': function () {

        var callback = typeof ErrorHandler();
        
        equal(callback, 'function', 'ErrorHandler should produce a callback');
    },
    
    'testErrorHandlerCallback': function () {

        var response = MockResponse(404, CONTENT_TYPE, MESSAGE_404);
        
        ErrorHandler({})(404, null, response, null);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testErrorHandlerWithNullCallback': function () {

        var response = MockResponse(404, CONTENT_TYPE, MESSAGE_404);
        
        ErrorHandler(null)(404, null, response, null);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testErrorHandlerWithUndefinedCallback': function () {

        var response = MockResponse(404, CONTENT_TYPE, MESSAGE_404);

        ErrorHandler()(404, null, response, null);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testErrorHandlerWithCustomHandlerCallback': function () {

        var response = MockResponse();

        var called = false;

        ErrorHandler({ 
            '999': function () { called = true; } 
        })(999, null, response, null);
        
        ok(!response.writeHeadCalled, 'writeHead() should not be called.');
        ok(!response.writeCalled, 'write() should not be called.');
        ok(!response.endCalled, 'end() should not be called.');
        
        ok(called, 'custom handler should be called');
    },
    
    'testErrorHandlerWithNoHandlerCallback': function () {

        var response = MockResponse(500, CONTENT_TYPE, MESSAGE_500);

        ErrorHandler()(999, null, response, null);
        
        ok(response.writeHeadCalled, 'writeHead() should not be called.');
        ok(response.writeCalled, 'write() should not be called.');
        ok(response.endCalled, 'end() should not be called.');
    }
}

module.exports = tests;