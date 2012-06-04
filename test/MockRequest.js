/**
 * Author: Karl Bennett
 */

var assert = require('assert');


var equal = assert.equal;
var deepEqual = assert.deepEqual;


/**
 * Constant test values.
 */
var GET = 'GET';
var POST = 'POST';
var TEST_URL = 'http://localhost:9032/test';
var TEST_PATH = '/test';
var TEST_PARAMETER_ONE_NAME = 'one';
var TEST_PARAMETER_ONE_VALUE = '1';
var TEST_PARAMETER_ONE = TEST_PARAMETER_ONE_NAME + '=' + TEST_PARAMETER_ONE_VALUE;
var TEST_PARAMETER_TWO_NAME = 'two';
var TEST_PARAMETER_TWO_VALUE = '2';
var TEST_PARAMETER_TWO = TEST_PARAMETER_TWO_NAME + '=' + TEST_PARAMETER_TWO_VALUE;
var TEST_PARAMETER_THREE_NAME = 'three';
var TEST_PARAMETER_THREE_VALUE = '3';
var TEST_PARAMETER_THREE = TEST_PARAMETER_THREE_NAME + '=' + TEST_PARAMETER_THREE_VALUE;

/**
 * A mock Node.js request object that can be used as a test dependency.
 * 
 * @param method - the HTTP request method.
 * @param url - the request url.
 * @returns an object containing mocked request values.
 */
function MockRequest(method, url) {

    return {
        
        'method': method,
        
        'url': url
    };
};

module.exports = MockRequest;
module.exports.GET = GET;
module.exports.POST = POST;
module.exports.TEST_URL = TEST_URL;
module.exports.TEST_PATH = TEST_PATH;
module.exports.TEST_PARAMETER_ONE_NAME = TEST_PARAMETER_ONE_NAME;
module.exports.TEST_PARAMETER_ONE_VALUE = TEST_PARAMETER_ONE_VALUE;
module.exports.TEST_PARAMETER_ONE = TEST_PARAMETER_ONE;
module.exports.TEST_PARAMETER_TWO_NAME = TEST_PARAMETER_TWO_NAME;
module.exports.TEST_PARAMETER_TWO_VALUE = TEST_PARAMETER_TWO_VALUE;
module.exports.TEST_PARAMETER_TWO = TEST_PARAMETER_TWO;
module.exports.TEST_PARAMETER_THREE_NAME = TEST_PARAMETER_THREE_NAME;
module.exports.TEST_PARAMETER_THREE_VALUE = TEST_PARAMETER_THREE_VALUE;
module.exports.TEST_PARAMETER_THREE = TEST_PARAMETER_THREE;
