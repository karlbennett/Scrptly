/**
 * Author: Karl Bennett
 */

var RequestHandler = require('../lib/RequestHandler');
var ErrorHandler = require('../lib/ErrorHandler');
var assert = require('assert');
var MockResponse = require('./MockResponse');
var MockRequest = require('./MockRequest');


var ok = assert.ok;
var equal = assert.equal;


var TEST_CODE = MockResponse.TEST_CODE;
var TEST_HEADERS = MockResponse.TEST_HEADERS;
var CONTENT_TYPE = MockResponse.CONTENT_TYPE;
var TEST_BODY = MockResponse.TEST_BODY;
var GET = MockRequest.GET;
var POST = MockRequest.POST;
var TEST_URL = MockRequest.TEST_URL;
var TEST_PATH = MockRequest.TEST_PATH;

var MESSAGE_404 = ErrorHandler.MESSAGE_404;
var MESSAGE_500 = ErrorHandler.MESSAGE_500;


var tests = {

    'testRequestHandler': function () {

        var callback = typeof RequestHandler({});
        
        equal(callback, 'function', 'RequestHandler should produce a callback');
    },
    
    'testRequestHandlerWithInvalidHandlerMap': function () {

        var callback = typeof RequestHandler('not a handler map');
        
        equal(callback, 'function', 'RequestHandler should produce a callback');
    },
    
    'testRequestHandlerWithNull': function () {

        var callback = typeof RequestHandler(null);
        
        equal(callback, 'function', 'RequestHandler should produce a callback');
    },
    
    'testRequestHandlerWithUndefined': function () {

        var callback = typeof RequestHandler();
        
        equal(callback, 'function', 'RequestHandler should produce a callback');
    },
    
    'testRequestHandlerCallback': function () {

        var request = MockRequest(GET, TEST_URL);
        var response = MockResponse(404, CONTENT_TYPE, MESSAGE_404);
        
        RequestHandler({})(request, response);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testRequestHandlerWithNullCallback': function () {

        var request = MockRequest(GET, TEST_URL);
        var response = MockResponse(404, CONTENT_TYPE, MESSAGE_404);
        
        RequestHandler(null)(request, response);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testRequestHandlerWithUndefinedCallback': function () {

        var request = MockRequest(GET, TEST_URL);
        var response = MockResponse(404, CONTENT_TYPE, MESSAGE_404);

        RequestHandler()(request, response);
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testRequestHandlerWithCustomHandlerCallback': function () {

        var request = MockRequest(GET, TEST_URL);
        var response = MockResponse();

        var called = false;

        var handlers = {};
        handlers[TEST_PATH] = function () { called = true; };

        RequestHandler(handlers)(request, response);
        
        ok(!response.writeHeadCalled, 'writeHead() should not be called.');
        ok(!response.writeCalled, 'write() should not be called.');
        ok(!response.endCalled, 'end() should not be called.');
        
        ok(called, 'custom handler should be called');
    }
}

module.exports = tests;