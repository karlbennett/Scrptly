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
