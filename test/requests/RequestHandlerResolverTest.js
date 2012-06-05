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
var TEST_PARAMETER_ONE_NAME = MockRequest.TEST_PARAMETER_ONE_NAME;
var TEST_PARAMETER_ONE_VALUE = MockRequest.TEST_PARAMETER_ONE_VALUE;
var TEST_PARAMETER_ONE = MockRequest.TEST_PARAMETER_ONE;
var TEST_PARAMETER_TWO_NAME = MockRequest.TEST_PARAMETER_TWO_NAME;
var TEST_PARAMETER_TWO_VALUE = MockRequest.TEST_PARAMETER_TWO_VALUE;
var TEST_PARAMETER_TWO = MockRequest.TEST_PARAMETER_TWO;
var TEST_PARAMETER_THREE_NAME = MockRequest.TEST_PARAMETER_THREE_NAME;
var TEST_PARAMETER_THREE_VALUE = MockRequest.TEST_PARAMETER_THREE_VALUE;
var TEST_PARAMETER_THREE = MockRequest.TEST_PARAMETER_THREE;

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
        handlers[TEST_PATH + ':' + request.method] = {
            'function': function () { 
                called = true; 
            }
        };

        RequestHandlerResolver(handlers)(request, response);
        
        ok(!response.writeHeadCalled, 'writeHead() should not be called.');
        ok(!response.writeCalled, 'write() should not be called.');
        ok(!response.endCalled, 'end() should not be called.');
        
        ok(called, 'custom handler should be called');
    },
    
    'testRequestHandlerWithCustomHandlerCallbackWithParameters': function () {

        var request = MockRequest(GET, TEST_URL + '?' + TEST_PARAMETER_ONE 
            + '&' + TEST_PARAMETER_TWO + '&' + TEST_PARAMETER_THREE);
        var response = MockResponse();

        var called = false;

        var handlers = {};
        handlers[TEST_PATH + ':' + request.method] = {
            'function': function (request, respoonse, one, two, three) { 
                called = true;
                
                equal(one, TEST_PARAMETER_ONE_VALUE, 'argument one value should be correct');
                equal(two, TEST_PARAMETER_TWO_VALUE, 'argument two value should be correct');
                equal(three, TEST_PARAMETER_THREE_VALUE, 'argument three value should be correct');
            },
            'parameters': ['one', 'two', 'three']
        };

        RequestHandlerResolver(handlers)(request, response);
        
        ok(!response.writeHeadCalled, 'writeHead() should not be called.');
        ok(!response.writeCalled, 'write() should not be called.');
        ok(!response.endCalled, 'end() should not be called.');
        
        ok(called, 'custom handler should be called');
    },
    
    'testRequestHandlerWithCustomHandlerCallbackWithOptionalParameters': function () {

        var request = MockRequest(GET, TEST_URL + '?' + TEST_PARAMETER_ONE 
            + '&' + TEST_PARAMETER_TWO + '&' + TEST_PARAMETER_THREE);
        var response = MockResponse();

        var called = false;

        var handlers = {};
        handlers[TEST_PATH + ':' + request.method] = {
            'function': function (request, respoonse, one, two, three) { 
                called = true;
                
                equal(one, TEST_PARAMETER_ONE_VALUE, 'argument one value should be correct');
                equal(two, TEST_PARAMETER_TWO_VALUE, 'argument two value should be correct');
                equal(three, TEST_PARAMETER_THREE_VALUE, 'argument three value should be correct');
            },
            'optional-parameters': ['one', 'two', 'three']
        };

        RequestHandlerResolver(handlers)(request, response);
        
        ok(!response.writeHeadCalled, 'writeHead() should not be called.');
        ok(!response.writeCalled, 'write() should not be called.');
        ok(!response.endCalled, 'end() should not be called.');
        
        ok(called, 'custom handler should be called');
    },
    
    'testRequestHandlerWithCustomHandlerCallbackWithOptionalandRequiredParameters': function () {

        var request = MockRequest(GET, TEST_URL + '?' + TEST_PARAMETER_ONE 
            + '&' + TEST_PARAMETER_TWO + '&' + TEST_PARAMETER_THREE);
        var response = MockResponse();

        var called = false;

        var handlers = {};
        handlers[TEST_PATH + ':' + request.method] = {
            'function': function (request, respoonse, one, two, three) { 
                called = true;
                
                equal(one, TEST_PARAMETER_ONE_VALUE, 'argument one value should be correct');
                equal(two, TEST_PARAMETER_TWO_VALUE, 'argument two value should be correct');
                equal(three, TEST_PARAMETER_THREE_VALUE, 'argument three value should be correct');
            },
            'parameters': ['one'],
            'optional-parameters': ['two', 'three']
        };

        RequestHandlerResolver(handlers)(request, response);
        
        ok(!response.writeHeadCalled, 'writeHead() should not be called.');
        ok(!response.writeCalled, 'write() should not be called.');
        ok(!response.endCalled, 'end() should not be called.');
        
        ok(called, 'custom handler should be called');
    },
    
    'testRequestHandlerWithCustomHandlerCallbackWithOptionalandRequiredParametersSomeMissing': function () {

        var request = MockRequest(GET, TEST_URL + '?' + TEST_PARAMETER_ONE 
            + '&' + TEST_PARAMETER_TWO);
        var response = MockResponse();

        var called = false;

        var handlers = {};
        handlers[TEST_PATH + ':' + request.method] = {
            'function': function (request, respoonse, one, two, three) { 
                called = true;
                
                equal(one, TEST_PARAMETER_ONE_VALUE, 'argument one value should be correct');
                equal(two, TEST_PARAMETER_TWO_VALUE, 'argument two value should be correct');
            },
            'parameters': ['one'],
            'optional-parameters': ['two', 'three']
        };

        RequestHandlerResolver(handlers)(request, response);
        
        ok(!response.writeHeadCalled, 'writeHead() should not be called.');
        ok(!response.writeCalled, 'write() should not be called.');
        ok(!response.endCalled, 'end() should not be called.');
        
        ok(called, 'custom handler should be called');
    }
}

module.exports = tests;