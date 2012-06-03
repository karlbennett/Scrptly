/**
 * Author: Karl Bennett
 */

var utils = require('../lib/Utils');
var assert = require('assert');


var ok = assert.ok;
var equal = assert.equal;

var NON_FUNCTION = 'not a function';

var tests = {

    'testIsFunction': function () {

        var func = function () {};
    
        ok(utils.isFunction(func), 'function should be found');
    },
    
    'testIsFunctionWithNonFunction': function () {
    
        ok(!utils.isFunction(NON_FUNCTION), 'no function should be found');
    },
    
    'testIsFunctionWithNull': function () {
    
        ok(!utils.isFunction(null), 'no function should be found');
    },
    
    'testIsNotFunction': function () {

        var func = function () {};
    
        ok(!utils.isNotFunction(func), 'function should be found');
    },
    
    'testIsNotFunctionWithNonFunction': function () {
    
        ok(utils.isNotFunction(NON_FUNCTION), 'no function should be found');
    },
    
    'testIsNotFunctionWithNull': function () {
    
        ok(utils.isNotFunction(null), 'no function should be found');
    },
    
    'testIsCallable': function () {
    
        var called = false;
    
        var func = function (arg) { called = arg; };
    
        ok(utils.isCallable(func)(true), 'the function should be callable');
        ok(called, 'the function should be called');
    },
    
    'testIsCallableWithNonFunction': function () {

        ok(!utils.isCallable(NON_FUNCTION)(true), 'the function should not be callable');
    },
    
    'testIsCallableWithNull': function () {

        ok(!utils.isCallable(null)(true), 'the function should not be callable');
    }
}

module.exports = tests;