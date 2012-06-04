/**
 * Author: Karl Bennett
 */

var RequestHandlerResolver = require('../../lib/requests/RequestHandlerResolver');
var ErrorHandlerResolver = require('../../lib/errors/ErrorHandlerResolver');
var assert = require('assert');
var MockResponse = require('../MockResponse');
var MockRequest = require('../MockRequest');


var ok = assert.ok;
var equal = assert.equal;
var expects = assert.throws;


var TEST_CODE = MockResponse.TEST_CODE;
var TEST_HEADERS = MockResponse.TEST_HEADERS;
var CONTENT_TYPE = MockResponse.CONTENT_TYPE;
var TEST_BODY = MockResponse.TEST_BODY;
var GET = MockRequest.GET;
var POST = MockRequest.POST;
var TEST_URL = MockRequest.TEST_URL;
var TEST_PATH = MockRequest.TEST_PATH;

var MESSAGE_404 = ErrorHandlerResolver.MESSAGE_404;
var MESSAGE_500 = ErrorHandlerResolver.MESSAGE_500;


function isPageNotFoundError(error) {
        
    equal(error.name, 'PageNotFoundError', 'page not found error should be thrown');
            
    return true;    
};


var tests = {

    'testRequestHandler': function () {

        var callback = typeof RequestHandlerResolver({});
        
        equal(callback, 'function', 'RequestHandler should produce a callback');
    },
    
    'testRequestHandlerWithInvalidHandlerMap': function () {

        var callback = typeof RequestHandlerResolver('not a handler map');
        
        equal(callback, 'function', 'RequestHandler should produce a callback');
    },
    
    'testRequestHandlerWithNull': function () {

        var callback = typeof RequestHandlerResolver(null);
        
        equal(callback, 'function', 'RequestHandler should produce a callback');
    },
    
    'testRequestHandlerWithUndefined': function () {

        var callback = typeof RequestHandlerResolver();
        
        equal(callback, 'function', 'RequestHandler should produce a callback');
    },
    
    'testRequestHandlerCallbackWithNoHandlers': function () {

        var request = MockRequest(GET, TEST_URL);

        expects(
            function () {
            
                RequestHandlerResolver({})(request, null)
            
            }, 
            isPageNotFoundError, 
            'error should be thrown if no handlers supplied'
            );
    },
    
    'testRequestHandlerCallbackWithNullHandlers': function () {

        var request = MockRequest(GET, TEST_URL);

        expects(
            function () {
            
                RequestHandlerResolver(null)(request, null)
            
            }, 
            isPageNotFoundError, 
            'error should be thrown if no handlers supplied'
            );
    },
    
    'testRequestHandlerCallbackWithUndefinedHandlers': function () {

        var request = MockRequest(GET, TEST_URL);

        expects(
            function () {
            
                RequestHandlerResolver()(request, null)
            
            }, 
            isPageNotFoundError, 
            'error should be thrown if no handlers supplied'
            );
    },
    
    'testRequestHandlerWithCustomHandlerCallback': function () {

        var request = MockRequest(GET, TEST_URL);
        var response = MockResponse();

        var called = false;

        var handlers = {};
        handlers[TEST_PATH] = function () { called = true; };

        RequestHandlerResolver(handlers)(request, response);
        
        ok(!response.writeHeadCalled, 'writeHead() should not be called.');
        ok(!response.writeCalled, 'write() should not be called.');
        ok(!response.endCalled, 'end() should not be called.');
        
        ok(called, 'custom handler should be called');
    }
}

module.exports = tests;