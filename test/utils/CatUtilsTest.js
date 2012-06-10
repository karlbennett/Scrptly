/**
 * Author: Karl Bennett
 */

var catUtils = require('../../lib/utils/CatUtils');
var utils = require('../../lib/utils/Utils');
var assert = require('assert');


var ok = assert.ok;
var equal = assert.equal;
var isNotBlank = utils.isNotBlank;
var isBlank = utils.isBlank;


var HOST = 'http://localhost';
var PATH = '/';
var SCRIPT_URL_ONE = 'http://localhost/script1.js';
var SCRIPT_URL_TWO = 'http://localhost/script2.js';
var SCRIPT_URL_THREE = 'http://localhost/script3.js';
var PREVIOUS_CODE = '// Some previous code.';



var tests = {

    'testRetrieveScripts': function () {

        catUtils.retrieveScripts(HOST, PATH, [SCRIPT_URL_ONE, SCRIPT_URL_TWO, SCRIPT_URL_THREE], function (error, code) {
            
            ok(isNotBlank(code), 'code should be retrived');
        });
    },
    
    'testRetrieveScriptsWithPreviousCode': function () {

        catUtils.retrieveScripts(HOST, PATH, [SCRIPT_URL_ONE, SCRIPT_URL_TWO, SCRIPT_URL_THREE], function (error, code) {
            
            ok(isNotBlank(code), 'code should be retrived');
            ok(-1 != code.indexOf(PREVIOUS_CODE), 'code should contain previous code');
        }, PREVIOUS_CODE);
    },
    
    'testRetrieveScriptsWithSingleUrl': function () {

        catUtils.retrieveScripts(HOST, PATH, SCRIPT_URL_ONE, function (error, code) {
            
            ok(isNotBlank(code), 'code should be retrived');
        });
    },
    
    'testRetrieveScriptsWithInvalidScriptUrl': function () {

        catUtils.retrieveScripts(HOST, PATH, 'points to nothing', function (error, code) {

            ok(isBlank(code), 'no code should be retrived');
            equal(error.name, 'InvalidResponseCodeError', 'correct error exposed')
        });
    },
    
    'testRetrieveScriptsWithNullUrl': function () {

        catUtils.retrieveScripts(HOST, PATH, null, function (error, code) {
            
            ok(isBlank(code), 'no code should be retrived');
            equal(error.name, 'IllegalArgumentError', 'correct error exposed')
        });
    }
}

module.exports = tests;