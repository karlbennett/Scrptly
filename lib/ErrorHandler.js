/** 
 * Author: Karl Bennett
 */

var utils = require('./Utils');
var nodeUtils = require('./NodeUtils');


var isNotBlank = utils.isNotBlank;
var isCallable = utils.isCallable;
var writeStringResponse = nodeUtils.writeStringResponse;


/**
 * Default error messages.
 */
var MESSAGE_404 = 'Page not found.';
var MESSAGE_500 = 'Internal server error.';

/**
 * Default HTTP error code handlers.
 */
var defaultErrorHandlers = {
    '404':  function (request, response, message) {

                writeStringResponse(response, 404, MESSAGE_404)
            },
            
    '500':  function (request, response, message) {
    
                writeStringResponse(response, 500, MESSAGE_500)
            }
};

/**
 * Function that returns a callback that can be used to handle HTTP error 
 * responses.
 * 
 * The returned call back will route HTTP error codes to handler functions 
 * contained with the provided 'handlers' map. The keys within the handlers map 
 * must match the HTTP error codes.
 * 
 * Key: <error code>
 *
 * For example a map containing handlers for the 404 and 500 error codes would 
 * look like this:
 * <code>
 *      {
 *          '404': function (request, response) {};
 *          '500': function (request, response) {};
 *      }
 * </code>
 * 
 * If no custom handler has been supplied for a specific error code a default 
 * will be used. If no default exists then the handler for error 500 will be 
 * used.
 * 
 * The callback returned by this function has the folling signature:
 * 
 * <code>
 *      function (error, request, response, message);
 * </code>
 * 
 * The 'error' argument should be given the error code, this si used to choose 
 * the correct error handler. The 'request', 'response', and message arguments 
 * are passed onto the error handler.
 * 
 * Usage:
 * <code>
 *      var errorHandler = ErrorHandler({
 *          '404':  function (request, response, message) {
 *          
 *                      response.writeHead(404, {"Content-Type": "text/plain"});
 *                      response.write(message);
 *                      response.end();
 *                  }
 *      });
 *      
 *      // request and response taken from Node.js server request context.
 *      errorHandler(404, request, response, 'Page not found.');
 * </code>
 * 
 * @param handlers - a mapping of HTTP error codes to handler functions.
 * @return a callback that can be used to handle HTTP error responses.
 */
function ErrorHandler (handlers) {
    
    return function (error, request, response, message) {
       
        // If a custom error handler for the supplied HTTP error code is 
        // available use it and return.
        if(
            isNotBlank(handlers) &&
            isCallable(handlers[error])(request, response, message)
        ) {
            
            return;
        }
        
        // Otherwise check for a default handler for the supplied error code and 
        // use that.
        if(isCallable(defaultErrorHandlers[error])(request, response, message)) {
            
            return;
        }
        
        // As a last resort just use the HTTP 500 error handler.
        if(isCallable(defaultErrorHandlers[500])(request, response, message)) {
            
            return;
        }
    };
};


module.exports = ErrorHandler;
module.exports.defaultErrorHandlers = defaultErrorHandlers;
module.exports.MESSAGE_404 = MESSAGE_404;
module.exports.MESSAGE_500 = MESSAGE_500;
