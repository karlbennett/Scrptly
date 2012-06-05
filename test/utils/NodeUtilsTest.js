/**
 * Author: Karl Bennett
 */

var nodeUtils = require('../../lib/utils/NodeUtils');
var assert = require('assert');
var MockResponse = require('../MockResponse');


var ok = assert.ok;
var equal = assert.equal;
var deepEqual = assert.deepEqual;


var TEST_CODE = MockResponse.TEST_CODE;
var TEST_HEADERS = MockResponse.TEST_HEADERS;
var CONTENT_TYPE = MockResponse.CONTENT_TYPE;
var TEST_BODY = MockResponse.TEST_BODY;

var TEST_PARAMETERS = { 'one': 1, 'two': 2, 'three': 3 };
var TEST_PARAMETER_NAMES_SUBSET = [ 'one', 'three' ];
var TEST_PARAMETER_VALUES_SUBSET = [ 1, 3 ];
var TEST_PARAMETER_NAMES = [ 'one', 'two', 'three' ];
var TEST_PARAMETER_VALUES = [ 1, 2, 3 ];
var TEST_PARAMETER_NAMES_SUPERSET = [ 'one', 'two', 'three', 'four' ];
var TEST_PARAMETER_VALUES_SUPERSET = [ 1, 2, 3, 4 ];
var TEST_PARAMETER_MISSING_NAMES = [ 'four' ];


var tests = {

    'testExtractParameterValues': function () {

        var values = nodeUtils.extractParameterValues(TEST_PARAMETERS, TEST_PARAMETER_NAMES);
        
        deepEqual(values, TEST_PARAMETER_VALUES, 'the correct values are extracted')
    },
    
    'testExtractParameterValuesWithSubset': function () {

        var values = nodeUtils.extractParameterValues(TEST_PARAMETERS, TEST_PARAMETER_NAMES_SUBSET);
        
        deepEqual(values, TEST_PARAMETER_VALUES_SUBSET, 'the correct values are extracted')
    },
    
    'testExtractParameterValuesWithSuperset': function () {

        var values = nodeUtils.extractParameterValues(TEST_PARAMETERS, TEST_PARAMETER_NAMES_SUPERSET);
        
        deepEqual(values, TEST_PARAMETER_VALUES, 'the correct values are extracted')
    },
    
    'testExtractParameterValuesWithNullParameters': function () {

        var values = nodeUtils.extractParameterValues(null, TEST_PARAMETER_NAMES_SUPERSET);
        
        deepEqual(values, [], 'no values should be extracted')
    },
    
    'testExtractParameterValuesWithNullParameterNames': function () {

        var values = nodeUtils.extractParameterValues(TEST_PARAMETERS, null);
        
        deepEqual(values, [], 'no values should be extracted')
    },
    
    'testExtractParameterValuesWithUndefinedParameterNames': function () {

        var values = nodeUtils.extractParameterValues(TEST_PARAMETERS);
        
        deepEqual(values, [], 'no values should be extracted')
    },
    
    'testFindMissingParameterNames': function () {

        var values = nodeUtils.findMissingParameterNames(TEST_PARAMETERS, TEST_PARAMETER_NAMES);
        
        deepEqual(values, [], 'no missing parameter names should be found')
    },
    
    'testFindMissingParameterNamesWithSubset': function () {

        var values = nodeUtils.findMissingParameterNames(TEST_PARAMETERS, TEST_PARAMETER_NAMES_SUBSET);
        
        deepEqual(values, [], 'no missing parameter names should be found')
    },
    
    'testFindMissingParameterNamesWithSuperset': function () {

        var values = nodeUtils.findMissingParameterNames(TEST_PARAMETERS, TEST_PARAMETER_NAMES_SUPERSET);
        
        deepEqual(values, TEST_PARAMETER_MISSING_NAMES, 'missing parameter names should be found')
    },
    
    'testFindMissingParameterNamesWithNullParameters': function () {

        var values = nodeUtils.findMissingParameterNames(null, TEST_PARAMETER_NAMES);
        
        deepEqual(values, TEST_PARAMETER_NAMES, 'missing parameter names should be found')
    },
    
    'testFindMissingParameterNamesWithNullParameterNames': function () {

        var values = nodeUtils.findMissingParameterNames(TEST_PARAMETERS, null);
        
        deepEqual(values, [], 'no values should be extracted')
    },
    
    'testFindMissingParameterNamesWithUndefinedParameterNames': function () {

        var values = nodeUtils.findMissingParameterNames(TEST_PARAMETERS);
        
        deepEqual(values, [], 'no values should be extracted')
    },
    
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