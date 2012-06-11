/**
 * Author: Karl Bennett
 */

var cat = require('../../lib/concatenation/Cat');
var utils = require('../../lib/utils/Utils');
var assert = require('assert');


var ok = assert.ok;
var equal = assert.equal;
var isNotBlank = utils.isNotBlank;
var isBlank = utils.isBlank;


var FILE_HOST = process.cwd();
var SCRIPT_FILE_ONE = 'test/resources/script1.js';
var SCRIPT_FILE_TWO = 'test/resources/script2.js';
var SCRIPT_FILE_THREE = 'test/resources/script3.js';

var URL_HOST = 'http://localhost/simple-requirejs.html';
var SCRIPT_URL_ONE = 'script1.js';
var SCRIPT_URL_TWO = 'script2.js';
var SCRIPT_URL_THREE = 'script3.js';

var PREVIOUS_DATA = '// Some previous data.';



var tests = {

    'testCatFiles': function () {

        cat.cat(FILE_HOST, [SCRIPT_FILE_ONE, SCRIPT_FILE_TWO, SCRIPT_FILE_THREE], 
            function (error, code) {

                ok(isNotBlank(code), 'code should be retrived');
            });
    },
    
    'testCatSingleFile': function () {

        cat.cat(FILE_HOST, SCRIPT_FILE_ONE, function (error, code) {

            ok(isNotBlank(code), 'code should be retrived');
        });
    },
    
    'testCatFilesWithPreviouseData': function () {

        cat.cat(FILE_HOST, [SCRIPT_FILE_ONE, SCRIPT_FILE_TWO, SCRIPT_FILE_THREE], 
            function (error, code) {

                ok(isNotBlank(code), 'code should be retrived');
                
                ok(-1 < code.indexOf(PREVIOUS_DATA), 'previouse data concatentated')
                
            }, PREVIOUS_DATA);
    },
    
    'testCatFilesWithNullHost': function () {

        cat.cat(null, [SCRIPT_FILE_ONE, SCRIPT_FILE_TWO, SCRIPT_FILE_THREE], 
            function (error, code) {

                ok(isNotBlank(error), 'null host should produce error');
            });
    },
    
    'testCatFilesWithNullFiles': function () {

        cat.cat(FILE_HOST, null, function (error, code) {

            ok(isNotBlank(error), 'null host should produce error');
        });
    },
    
    'testCatUrls': function () {

        cat.cat(URL_HOST, [SCRIPT_URL_ONE, SCRIPT_URL_TWO, SCRIPT_URL_THREE], 
            function (error, code) {

                ok(isNotBlank(code), 'code should be retrived');
            });
    },
    
    'testCatSingleUrl': function () {

        cat.cat(URL_HOST, SCRIPT_URL_ONE, function (error, code) {

            ok(isNotBlank(code), 'code should be retrived');
        });
    },
    
    'testCatUrlsWithPreviouseData': function () {

        cat.cat(URL_HOST, [SCRIPT_URL_ONE, SCRIPT_URL_TWO, SCRIPT_URL_THREE], 
            function (error, code) {

                ok(isNotBlank(code), 'code should be retrived');
                
                ok(-1 < code.indexOf(PREVIOUS_DATA), 'previouse data concatentated')
                
            }, PREVIOUS_DATA);
    },
    
    'testCatUrlsWithNullHost': function () {

        cat.cat(null, [SCRIPT_URL_ONE, SCRIPT_URL_TWO, SCRIPT_URL_THREE], 
            function (error, code) {

                ok(isNotBlank(error), 'null host should produce error');
            });
    },
    
    'testCatUrlsWithNullUrls': function () {

        cat.cat(URL_HOST, null, function (error, code) {

            ok(isNotBlank(error), 'null host should produce error');
        });
    }
}

module.exports = tests;