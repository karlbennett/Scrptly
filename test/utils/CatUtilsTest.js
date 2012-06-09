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


var SCRIPT_URL_ONE = 'http://localhost/script1.js';
var SCRIPT_URL_TWO = 'http://localhost/script2.js';
var SCRIPT_URL_THREE = 'http://localhost/script3.js';
var PREVIOUS_CODE = '// Some previous code.';



var tests = {

    'testRetrieveScripts': function () {

        catUtils.retrieveScripts([SCRIPT_URL_ONE, SCRIPT_URL_TWO, SCRIPT_URL_THREE], function (code) {
            
            ok(isNotBlank(code), 'code should be retrived');
        });
    },
    
    'testRetrieveScriptsWithPreviousCode': function () {

        catUtils.retrieveScripts([SCRIPT_URL_ONE, SCRIPT_URL_TWO, SCRIPT_URL_THREE], function (code) {
            
            ok(isNotBlank(code), 'code should be retrived');
            ok(-1 != code.indexOf(PREVIOUS_CODE), 'code should contain previous code');
        }, PREVIOUS_CODE);
    },
    
    'testRetrieveScriptsWithSingleUrl': function () {

        catUtils.retrieveScripts(SCRIPT_URL_ONE, function (code) {
            
            ok(isNotBlank(code), 'code should be retrived');
        });
    },
    
    'testRetrieveScriptsWithNullUrl': function () {

        catUtils.retrieveScripts(null, function (code) {
            
            ok(isBlank(code), 'no code should be retrived');
        });
    }
}

module.exports = tests;