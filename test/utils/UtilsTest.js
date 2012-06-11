/**
 * Author: Karl Bennett
 */

var utils = require('../../lib/utils/Utils');
var assert = require('assert');


var ok = assert.ok;
var equal = assert.equal;

var OBJECT = { 'this': 'is', 'an': 'object' };
var ARRAY = ['this', 'is', 'an', 'array'];
var FUNCTION = function () {return 'this is a function';};
var STRING = 'this is a string';
var NUMBER = 32;

var tests = {

    'testIsFunction': function () {

        ok(utils.isFunction(FUNCTION), 'function should be found');
    },
    
    'testIsFunctionWithNonFunction': function () {
    
        ok(!utils.isFunction(STRING), 'no function should be found');
    },
    
    'testIsFunctionWithNull': function () {
    
        ok(!utils.isFunction(null), 'no function should be found');
    },
    
    'testIsNotFunction': function () {

        ok(!utils.isNotFunction(FUNCTION), 'function should be found');
    },
    
    'testIsNotFunctionWithNonFunction': function () {
    
        ok(utils.isNotFunction(STRING), 'no function should be found');
    },
    
    'testIsNotFunctionWithNull': function () {
    
        ok(utils.isNotFunction(null), 'no function should be found');
    },

    'testIsObject': function () {

        ok(utils.isObject(OBJECT), 'object should be found');
    },
    
    'testIsObjectWithArray': function () {
    
        ok(utils.isObject(ARRAY), 'no object should be found');
    },
    
    'testIsObjectWithString': function () {
    
        ok(!utils.isObject(STRING), 'no object should be found');
    },
    
    'testIsObjectWithNull': function () {
    
        ok(!utils.isObject(null), 'no object should be found');
    },
    
    'testIsNotObject': function () {

        ok(!utils.isNotObject(OBJECT), 'object should be found');
    },
    
    'testIsNotObjectWithArray': function () {
    
        ok(!utils.isNotObject(ARRAY), 'no object should be found');
    },
    
    'testIsNotObjectWithString': function () {
    
        ok(utils.isNotObject(STRING), 'no object should be found');
    },
    
    'testIsNotObjectWithNull': function () {
    
        ok(utils.isNotObject(null), 'no object should be found');
    },
 
    'testIsArray': function () {

        ok(utils.isArray(ARRAY), 'array should be found');
    },
    
    'testIsArrayWithObject': function () {
    
        ok(!utils.isArray(OBJECT), 'no array should be found');
    },
    
    'testIsArrayWithString': function () {
    
        ok(!utils.isArray(STRING), 'no array should be found');
    },
    
    'testIsArrayWithNull': function () {
    
        ok(!utils.isArray(null), 'no array should be found');
    },
    
    'testIsNotArray': function () {

        ok(!utils.isNotArray(ARRAY), 'array should be found');
    },
    
    'testIsNotArrayWithObject': function () {
    
        ok(utils.isNotArray(OBJECT), 'no array should be found');
    },
    
    'testIsNotArrayWithString': function () {
    
        ok(utils.isNotArray(STRING), 'no array should be found');
    },
    
    'testIsNotArrayWithNull': function () {
    
        ok(utils.isNotArray(null), 'no array should be found');
    },
 
    'testIsString': function () {

        ok(utils.isString(STRING), 'string should be found');
    },
    
    'testIsStringWithObject': function () {
    
        ok(!utils.isString(OBJECT), 'no string should be found');
    },
    
    'testIsStringWithArray': function () {
    
        ok(!utils.isString(OBJECT), 'no string should be found');
    },
    
    'testIsStringWithNull': function () {
    
        ok(!utils.isString(null), 'no string should be found');
    },
    
    'testIsNotString': function () {

        ok(!utils.isNotString(STRING), 'string should be found');
    },
    
    'testIsNotStringWithObject': function () {
    
        ok(utils.isNotString(OBJECT), 'no string should be found');
    },
    
    'testIsNotStringWithArray': function () {
    
        ok(utils.isNotString(OBJECT), 'no string should be found');
    },
    
    'testIsNotStringWithNull': function () {
    
        ok(utils.isNotString(null), 'no string should be found');
    },
    
    'testIsNumber': function () {

        ok(utils.isNumber(NUMBER), 'number should be found');
    },
    
    'testIsNumberWithNonObject': function () {
    
        ok(!utils.isNumber(OBJECT), 'no number should be found');
    },
    
    'testIsNumberWithNull': function () {
    
        ok(!utils.isNumber(null), 'no number should be found');
    },
    
    'testIsNotNumber': function () {

        ok(!utils.isNotNumber(NUMBER), 'number should be found');
    },
    
    'testIsNotNumberWithNonObject': function () {
    
        ok(utils.isNotNumber(OBJECT), 'no number should be found');
    },
    
    'testIsNotNumberWithNull': function () {
    
        ok(utils.isNotNumber(null), 'no number should be found');
    },
 
    'testIsCallable': function () {
    
        var called = false;
    
        var func = function (arg) {called = arg;};
    
        ok(utils.isCallable(func)(true), 'the function should be callable');
        ok(called, 'the function should be called');
    },
    
    'testIsCallableWithNonFunction': function () {

        ok(!utils.isCallable(STRING)(true), 'the function should not be callable');
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