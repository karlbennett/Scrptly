/**
 * Author: Karl Bennett
 */

var PageNotFoundError = require('../lib/errors/PageNotFoundError');
var ServerError = require('../lib/errors/ServerError');
var ErrorHandlerResolver = require('../lib/errors/ErrorHandlerResolver');
var assert = require('assert');
var MockResponse = require('./MockResponse');


var ok = assert.ok;
var equal = assert.equal;
var expects = assert.throws;


var TEST_CODE = MockResponse.TEST_CODE;
var TEST_HEADERS = MockResponse.TEST_HEADERS;
var CONTENT_TYPE = MockResponse.CONTENT_TYPE;
var TEST_BODY = MockResponse.TEST_BODY;

var MESSAGE_404 = ErrorHandlerResolver.MESSAGE_404;
var MESSAGE_500 = ErrorHandlerResolver.MESSAGE_500;

var TEST_ERROR_NAME = 'TestError';
var TEST_ERROR = function () {
    
    return {
  
        'name': TEST_ERROR_NAME
    };
};

var tests = {

    'testErrorHandlerResolver': function () {

        var callback = typeof ErrorHandlerResolver({});
        
        equal(callback, 'function', 'ErrorHandlerResolver should produce a callback');
    },
    
    'testErrorHandlerResolverWithInvalidHandlerMap': function () {

        var callback = typeof ErrorHandlerResolver('not a handler map');
        
        equal(callback, 'function', 'ErrorHandlerResolver should produce a callback');
    },
    
    'testErrorHandlerResolverWithNull': function () {

        var callback = typeof ErrorHandlerResolver(null);
        
        equal(callback, 'function', 'ErrorHandlerResolver should produce a callback');
    },
    
    'testErrorHandlerResolverWithUndefined': function () {

        var callback = typeof ErrorHandlerResolver();
        
        equal(callback, 'function', 'ErrorHandlerResolver should produce a callback');
    },
    
    'testErrorHandlerResolverCallback': function () {

        var response = MockResponse(404, CONTENT_TYPE, MESSAGE_404);
        
        ErrorHandlerResolver({})(PageNotFoundError(null, response));
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testErrorHandlerResolverWithNullCallback': function () {

        var response = MockResponse(404, CONTENT_TYPE, MESSAGE_404);
        
        ErrorHandlerResolver(null)(PageNotFoundError(null, response));
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testErrorHandlerResolverWithUndefinedCallback': function () {

        var response = MockResponse(404, CONTENT_TYPE, MESSAGE_404);

        ErrorHandlerResolver()(PageNotFoundError(null, response));
        
        ok(response.writeHeadCalled, 'writeHead() should be called.');
        ok(response.writeCalled, 'write() should be called.');
        ok(response.endCalled, 'end() should be called.');
    },
    
    'testErrorHandlerResolverWithCustomHandlerCallback': function () {

        var response = MockResponse();

        var called = false;

        var errorHandlers = {};
        errorHandlers[TEST_ERROR_NAME] = function () {
            called = true;
        };

        ErrorHandlerResolver(errorHandlers)(TEST_ERROR());
        
        ok(!response.writeHeadCalled, 'writeHead() should not be called.');
        ok(!response.writeCalled, 'write() should not be called.');
        ok(!response.endCalled, 'end() should not be called.');
        
        ok(called, 'custom handler should be called');
    },
    
    'testErrorHandlerResolverWithNoHandlerCallback': function () {

        expects(
            function () {
            
                ErrorHandlerResolver()(TEST_ERROR());
            
            }, 
            function (error) {
                
                equal(
                    error.name, 
                    TEST_ERROR_NAME, 
                    'test exception should be rethrown.'
                    );
                
                return true;
            }, 
            'error should be thrown if no handlers supplied'
            );
    }
}

module.exports = tests;