/**
 * Author: Karl Bennett
 */

var utils = require('../../lib/utils/Utils');
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
    
        var func = function (arg) {called = arg;};
    
        ok(utils.isCallable(func)(true), 'the function should be callable');
        ok(called, 'the function should be called');
    },
    
    'testIsCallableWithNonFunction': function () {

        ok(!utils.isCallable(NON_FUNCTION)(true), 'the function should not be callable');
    },
    
    'testIsCallableWithNull': function () {

        ok(!utils.isCallable(null)(true), 'the function should not be callable');
    },
    
    'testIsDefined': function () {

        ok(utils.isDefined(1), 'variable should be defined');
    },
    
    'testIsDefinedWithNull': function () {

        ok(utils.isDefined(null), 'variable should be defined');
    },
    
    'testIsDefinedWithUndefined': function () {

        ok(!utils.isDefined(), 'variable should not be defined');
    },
    
    'testIsNotDefined': function () {

        ok(!utils.isNotDefined(1), 'variable should be defined');
    },
    
    'testIsNotDefinedWithNull': function () {

        ok(!utils.isNotDefined(null), 'variable should be defined');
    },
    
    'testIsNotDefinedWithUndefined': function () {

        ok(utils.isNotDefined(), 'variable should not be defined');
    },
    
    'testIsBlank': function () {

        ok(!utils.isBlank(1), 'variable should not be blank');
    },
    
    'testIsBlankWithNull': function () {

        ok(utils.isBlank(null), 'variable should be blank');
    },
    
    'testIsBlankWithUndefined': function () {

        ok(utils.isBlank(), 'variable should not be blank');
    },
    
    'testIsBlankWithEmptyArray': function () {

        ok(utils.isBlank([]), 'variable should be blank');
    },
    
    'testIsBlankWithNonEmptyArray': function () {

        ok(!utils.isBlank([1, 2, 3]), 'variable should not be blank');
    },
    
    'testIsBlankWithEmptyMap': function () {

        ok(utils.isBlank({}), 'variable should be blank');
    },
    
    'testIsBlankWithNonEmptyMap': function () {

        ok(!utils.isBlank({'one': 1, 'two': 2, 'three': 3}), 'variable should not be blank');
    },
    
    'testIsBlankWithEmptyString': function () {

        ok(utils.isBlank(''), 'variable should be blank');
    },
    
    'testIsBlankWithNonEmptyString': function () {

        ok(!utils.isBlank('1234'), 'variable should not be blank');
    },
    
    'testIsNotBlank': function () {

        ok(utils.isNotBlank(1), 'variable should not be blank');
    },
    
    'testIsNotBlankWithNull': function () {

        ok(!utils.isNotBlank(null), 'variable should be blank');
    },
    
    'testIsNotBlankWithUndefined': function () {

        ok(!utils.isNotBlank(), 'variable should be blank');
    },

    'testIsNotBlankWithEmptyArray': function () {

        ok(!utils.isNotBlank([]), 'variable should be blank');
    },
    
    'testIsNotBlankWithNonEmptyArray': function () {

        ok(utils.isNotBlank([1, 2, 3]), 'variable should not be blank');
    },
    
    'testIsNotBlankWithEmptyMap': function () {

        ok(!utils.isNotBlank({}), 'variable should be blank');
    },
    
    'testIsNotBlankWithNonEmptyMap': function () {

        ok(utils.isNotBlank({'one': 1, 'two': 2, 'three': 3}), 'variable should not be blank');
    },
    
    'testIsNotBlankWithEmptyString': function () {

        ok(!utils.isNotBlank(''), 'variable should be blank');
    },
    
    'testIsNotBlankWithNonEmptyString': function () {

        ok(utils.isNotBlank('1234'), 'variable should not be blank');
    }
}

module.exports = tests;