/** 
 * Author: Karl Bennett
 */

var url = require('url');
var utils = require('./Utils');
var ErrorHandler = require('./ErrorHandler');


var isNotBlank = utils.isNotBlank;
var isCallable = utils.isCallable;

/**
 *  The delimiter used within a requst mapping key name.
 */
var REQUEST_DELIMITER = ':';


/**
 * Function that returns a callback that can be regestered with the Node.js 
 * request event.
 * 
 * The returned call back will route HTTP requests to handler functions 
 * contained with the provided 'handlers' map. The keys within the handlers map 
 * must use the following convention.
 * 
 * Key: <url path>[:<method>]
 * 
 * That is if a function should be used to handle the following request:
 * <code>
 *      curl -XGET http://localhost:9032/test
 * </code>
 * 
 * Then the related key should be either of the following:
 * <code>
 *      {
 *          '/test:GET': function (request, response) {};
 *          '/test': function (request, response) {};
 *      }
 * </code>
 * 
 * Note: The second key will catch all other request e.g. POST, PUT, DELETE...
 * 
 * Custom error handling functions can also be included in the handlers map, the 
 * key must be the error code.
 * 
 * <code>
 *      {
 *          '404': function (request, response) {};
 *          '500': function (request, response) {};
 *      }
 * </code>
 * 
 * If no custom error handlers are supplied the default handlers will be used.
 * 
 * @param handlers - a mapping of HTTP requests to handler functions.
 * @return a callback that can be regestered with the Node.js request event.
 */
function RequestHandler (handlers) {

    var errorHandler = ErrorHandler(handlers);
  
    return function (request, response) {

        // If some custom request handlers have been supplied then check if one 
        // is available for the current request path.
        if (isNotBlank(handlers)) {
            
            var path = url.parse(request.url).pathname;
        
            if( isCallable(
                    handlers[path + REQUEST_DELIMITER + request.method]
                )(request, response, errorHandler)) {
            
                return;
            }
        
            if(isCallable(handlers[path])(request, response, errorHandler)) {
            
                return;
            }
        }

        errorHandler(404, request, response, 'Page not found.');
    };
};


module.exports = RequestHandler;
