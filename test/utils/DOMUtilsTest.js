/**
 * Author: Karl Bennett
 */

var domUtils = require('../../lib/utils/DOMUtils');
var utils = require('../../lib/utils/Utils');
var jsdom = require('jsdom');
var fs = require('fs');
var assert = require('assert');


var ok = assert.ok;
var equal = assert.equal;
var deepEqual = assert.deepEqual;
var isNotBlank = utils.isNotBlank;
var isBlank = utils.isBlank;


var HTML = fs.readFileSync('./resources/simple-requirejs.html', 'UTF-8');
var TITLE = 'Simple Test Page - RequireJS';
var RENDER_SCRIPT_TAG_NUM = 5;
var PARSE_SCRIPT_TAG_NUM = 2;
var PARSE_SCRIPT_URL_NUM = 1;
var INTERNAL_SCRIPT_TAG_NUM = 1;


var tests = {

    'testRenderPage': function () {

        domUtils.renderPage(HTML, function (errors, window) {

            equal(window.document.title, TITLE, 'page title should be correct');
        
            var scriptTags = window.document.getElementsByTagName('script');

            equal(scriptTags.length, RENDER_SCRIPT_TAG_NUM, 'script number should be correct');
        });
    },
    
    'testRenderPageWithInvalidHTML': function () {

        domUtils.renderPage('this should not parse', function (errors, window) {

            ok(isNotBlank(errors), 'the invalid HTML should have produced errors');
        });
    },
    
    'testRenderPageWithNullHTML': function () {

        domUtils.renderPage(null, function (errors, window) {

            ok(isNotBlank(errors), 'null HTML should have produced errors');
        });
    },
    
    'testParsePage': function () {

        domUtils.parsePage(HTML, function (errors, window) {

            equal(window.document.title, TITLE, 'page title should be correct');
        
            var scriptTags = window.document.getElementsByTagName('script');

            equal(scriptTags.length, PARSE_SCRIPT_TAG_NUM, 'script number should be correct');
        });
    },
    
    'testParsePageWithInvalidHTML': function () {

        domUtils.parsePage('this should not parse', function (errors, window) {

            ok(isNotBlank(errors), 'the invalid HTML should have produced errors');
        });
    },
    
    'testParsePageWithNullHTML': function () {

        domUtils.parsePage(null, function (errors, window) {

            ok(isNotBlank(errors), 'null HTML should have produced errors');
        });
    },
    
    'testExtractScriptUrls': function () {

        jsdom.env(HTML, function (errors, window) {
            
            var scriptUrls = domUtils.extractScriptUrls(window);
        
            equal(scriptUrls.length, PARSE_SCRIPT_URL_NUM, 'script number should be correct');
        });
    },
    
    'testExtractScriptUrlsWithNullWindow': function () {
        
        var scriptUrls = domUtils.extractScriptUrls(null);
        
        ok(isBlank(scriptUrls), 'script array should be empty');

    },
    
    'testExtractScriptUrlsWithUndefinedWindow': function () {
        
        var scriptUrls = domUtils.extractScriptUrls();
        
        ok(isBlank(scriptUrls), 'script array should be empty');

    },
    
    'testRemoveScriptTags': function () {
        
        jsdom.env(HTML, function (errors, window) {
            
            domUtils.removeExternalScriptTags(window);
            
            var scriptTags = window.document.getElementsByTagName('script');
        
            equal(scriptTags.length, INTERNAL_SCRIPT_TAG_NUM, 'window should contain no script tags');
        });
    },
    
    'testRemoveScriptTagsWithNullWindow': function () {
        
        var window = domUtils.removeExternalScriptTags(null);
            
        ok(isBlank(window), 'no DOM window object should be returned');
    },
    
    'testRemoveScriptTagsWithUndefinedWindow': function () {
        
        var window = domUtils.removeExternalScriptTags();
            
        ok(isBlank(window), 'no DOM window object should be returned');
    },
    
    'testAddScriptTags': function () {
        
        jsdom.env(HTML, function (errors, window) {
            
            domUtils.addScriptTags(window, ['http://test.com/script1.js', 'http://test.com/script1.js']);
            
            var scriptTags = window.document.getElementsByTagName('script');
        
            equal(scriptTags.length, PARSE_SCRIPT_TAG_NUM + 2, 'script number should be correct');
        });
    },
    
    'testAddScriptTagsWithSingleUrl': function () {
        
        jsdom.env(HTML, function (errors, window) {
            
            domUtils.addScriptTags(window, 'http://test.com/script1.js');
            
            var scriptTags = window.document.getElementsByTagName('script');
        
            equal(scriptTags.length, PARSE_SCRIPT_TAG_NUM + 1, 'script number should be correct');
        });
    },
    
    'testAddScriptTagsWithNullUrl': function () {
        
        jsdom.env(HTML, function (errors, window) {
            
            domUtils.addScriptTags(window, null);
            
            var scriptTags = window.document.getElementsByTagName('script');
        
            equal(scriptTags.length, PARSE_SCRIPT_TAG_NUM, 'script number should be correct');
        });
    },
    
    'testAddScriptTagsWithUndefinedUrl': function () {
        
        jsdom.env(HTML, function (errors, window) {
            
            domUtils.addScriptTags(window);
            
            var scriptTags = window.document.getElementsByTagName('script');
        
            equal(scriptTags.length, PARSE_SCRIPT_TAG_NUM, 'script number should be correct');
        });
    },
    
    'testAddScriptTagsWithNullWindow': function () {
        
            var window = domUtils.addScriptTags(null, ['http://test.com/script1.js', 'http://test.com/script1.js']);
            
            ok(isBlank(window), 'no DOM window object should be returned');
    },
    
    'testAddScriptTagsWithNullWindowAndNullUrl': function () {
        
            var window = domUtils.addScriptTags(null, null);
            
            ok(isBlank(window), 'no DOM window object should be returned');
    },
    
    'testAddScriptTagsWithUndefinedWindowAndUndefinedUrl': function () {
        
            var window = domUtils.addScriptTags();
            
            ok(isBlank(window), 'no DOM window object should be returned');
    }
}

module.exports = tests;