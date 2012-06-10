/** 
 * Author: Karl Bennett
 */

/**
 * The name of a JavaScript function type.
 */
var FUNCTION = 'function';

/**
 * The name of an object type, this is also the name of an array type.
 */
var OBJECT = 'object';

/**
 * The name of a string type.
 */
var STRING = 'string';

/**
 * The name of a number type.
 */
var NUMBER = 'number';


/**
 * Check if the provided variable is defined.
 * 
 * @param variable - the variable to check.
 * @return true if the variable is defined otherwise false.
 */
function isDefined(variable) {
    
    return typeof variable !== 'undefined';
}

/**
 * Check if the provided variable is not defined.
 * 
 * @param variable - the variable to check.
 * @return true if the variable is not defined otherwise false.
 */
function isNotDefined(variable) {
    
    return !isDefined(variable);
}

/**
 * Check if the provided value is blank.
 * 
 * @param value - the value to check.
 * @return true if the variable is blank otherwise false.
 */
function isBlank(value) {
    
    if (isNotDefined(value)) return true;
    
    if (null === value) return true;
    
    if ((typeof value === 'object' || typeof value === 'string')) {

        for (i in value) return false;

        return true; 
    }
    
    return false;
}

/**
 * Check if the provided value is not blank.
 * 
 * @param value - the value to check.
 * @return true if the variable is not blank otherwise false.
 */
function isNotBlank(value) {
    
    return !isBlank(value);
}

/**
 * Check if the provided value is a function.
 * 
 * @param func - the value to check.
 * @return true if func is a function otherwise false.
 */
function isFunction(func) {
  
    return typeof func === FUNCTION;
};

/**
 * Check if the provided value is not a function.
 * 
 * @param notFunc - the value to check.
 * @return true if notFunc is not a function otherwise false.
 */
function isNotFunction(notFunc) {
  
    return !isFunction(notFunc);
};

/**
 * Check if the provided value is an object.
 * 
 * @param object - the value to check.
 * @return true if object is an object otherwise false.
 */
function isObject(object) {
  
    return null != object && typeof object === OBJECT;
};

/**
 * Check if the provided value is not an object.
 * 
 * @param notObject - the value to check.
 * @return true if notObject is not an object otherwise false.
 */
function isNotObject(notObject) {
  
    return !isObject(notObject);
};

/**
 * Check if the provided value is an array.
 * 
 * @param array - the value to check.
 * @return true if array is an array otherwise false.
 */
function isArray(array) {
  
    return isObject(array);
};

/**
 * Check if the provided value is not an array.
 * 
 * @param notArray - the value to check.
 * @return true if notArray is not an array otherwise false.
 */
function isNotArray(notArray) {
  
    return !isArray(notArray);
};

/**
 * Check if the provided value is a string.
 * 
 * @param string - the value to check.
 * @return true if string is a string otherwise false.
 */
function isString(string) {
  
    return typeof string === STRING;
};

/**
 * Check if the provided value is not a string.
 * 
 * @param notString - the value to check.
 * @return true if notString is not a string otherwise false.
 */
function isNotString(notString) {
  
    return !isString(notString);
};

/**
 * Check if the provided value is a number.
 * 
 * @param number - the value to check.
 * @return true if number is a number otherwise false.
 */
function isNumber(number) {
  
    return typeof number === NUMBER;
};

/**
 * Check if the provided value is not a number.
 * 
 * @param notNumber - the value to check.
 * @return true if notNumber is not a number otherwise false.
 */
function isNotNumber(notNumber) {
  
    return !isNumber(notNumber);
};

/**
 * Function that returns a call back that wraps the provided value. The call 
 * back will call the provided value with any supplied arguments if it is a 
 * function and will then return true. Otherwise if the value is not a function 
 * it will just return false.
 * 
 * Usage:
 * <code>
 *      var func =  function (one, two) {
 *                      console.log('Arg1: ' + one + ' Arg2: ' + two);
 *                  };
 *      
 *      if (callable(func)('Hellow', 'World')) console.log('Is a function.');
 *      else console.log('Is not a function.');
 * </code>
 * 
 * @param func - the value to try and call as a function.
 * @return  the callback that either passes it's arguments onto the provided 
 *          function and returns true or the provided functions result. 
 *          Otherwise if the value is not a function just returns false.
 */
function isCallable(func) {
    // This call back can be used to safely try and call the supplied value as 
    // a function.
    return function () {
    
        // Check if the supplied value is a function.
        if(isFunction(func)) {
            
            // If it is exicute it with any supplied arguments.
            var result = func.apply(null, arguments);
            // And return either the result of the functionif there is one or 
            // true.
            return result ? result : true;
        }
        // If the supplied value is not a function then just return false.
        return false;
    }
};


exports.isDefined = isDefined;
exports.isNotDefined = isNotDefined;
exports.isBlank = isBlank;
exports.isNotBlank = isNotBlank;
exports.isFunction = isFunction;
exports.isNotFunction = isNotFunction;
exports.isObject = isObject;
exports.isNotObject = isNotObject;
exports.isArray = isArray;
exports.isNotArray = isNotArray;
exports.isString = isString;
exports.isNotString = isNotString;
exports.isNumber = isNumber;
exports.isNotNumber = isNotNumber;
exports.isCallable = isCallable;
