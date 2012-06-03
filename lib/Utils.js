/** 
 * Author: Karl Bennett
 */

/**
 * The name of a JavaScript function type.
 */
var FUNCTION = 'function';


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
 * @return true if func is not a function otherwise false.
 */
function isNotFunction(notFunc) {
  
    return !isFunction(notFunc);
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


exports.isFunction = isFunction;
exports.isNotFunction = isNotFunction;
exports.isCallable = isCallable;
