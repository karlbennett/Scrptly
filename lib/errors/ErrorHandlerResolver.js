/**
 * Author: Karl Bennett
 */

var utils = require('../utils/Utils');
var nodeUtils = require('../utils/NodeUtils');


var isNotBlank = utils.isNotBlank;
var isCallable = utils.isCallable;
var writeStringResponse = nodeUtils.writeStringResponse;


function handleUnknownError (error) {
    
    var message = error.message + '\n\n' + error.stack;
    
    writeStringResponse(error.response, error.code, message);
}


var DEFAULT_ERROR_HANDLERS = {
    
    'PageNotFoundError':  function (error) {

        writeStringResponse(error.response, error.code, error.message);
    },
    
    'InvalidResponseCodeError':  function (error) {

        writeStringResponse(error.response, error.code, error.message);
    },
    
    'MissingRequestParameterError':  function (error) {

        writeStringResponse(error.response, error.code, error.message);
    },
            
    'ServerError': handleUnknownError 
};


/**
 * Function that returns a callback that can be regestered with the Node.js 
 * 'uncaughtException' event listener.
 * 
 * The returned call back will route exceptions to the related handler function.
 * 
 * A map of error name keys and related error handler functions should be passed 
 * to this function. The call back will then execute the handler function for 
 * the key that natches the <code>error.name</code>.
 * 
 * If a matching handler cannot be found within the supplied handlers then a 
 * default set of handlers will be tried. If that fails then the error will be 
 * rethrown.
 * 
 * @param errorHandlers - a map of error handlers.
 * @return  a callback that can be regestered with the Node.js 
 *          'uncaughtException' event listener.
 */
function ErrorHandlerResolver (errorHandlers) {
  
    return function (error) {
 
        if (isNotBlank(errorHandlers)) {

            if(isCallable(errorHandlers[error.name])(error)) {
          
                return;
            }
        }
        
        if( isCallable(DEFAULT_ERROR_HANDLERS[error.name])(error)) {
            
            return;
        }
        
        handleUnknownError(error);
    };
};

module.exports = ErrorHandlerResolver;
module.exports.DEFAULT_ERROR_HANDLERS = DEFAULT_ERROR_HANDLERS;
