/** 
 * Author: Karl Bennett
 */

var url = require('url');
var utils = require('../utils/Utils');
var nodeUtils = require('../utils/NodeUtils');
var PageNotFoundError = require('../errors/PageNotFoundError');
var MissingRequestParameterError = require('../errors/MissingRequestParameterError');


var isBlank = utils.isBlank;
var isNotBlank = utils.isNotBlank;
var extractParameterValues = nodeUtils.extractParameterValues;
var findMissingParameterNames = nodeUtils.findMissingParameterNames;

/**
 *  The delimiter used within a requst mapping key name.
 */
var REQUEST_DELIMITER = ':';

/**
 *  The key of the hanlder function attribute.
 */
var FUNCTION = 'function';

/**
 *  The key of the hanlder parameters attribute.
 */
var PARAMETERS = 'parameters';

/**
 *  The key of the hanlder optional parameters attribute.
 */
var OPTIONAL_PARAMETERS = 'optional-parameters';


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
 *          '/test:GET': ...
 *          '/test': ...
 *      }
 * </code>
 * 
 * Note: The second key will catch all other request e.g. POST, PUT, DELETE...
 * 
 * The value related to a hanlder key must be a map containing at least the key 
 * 'function' wich maps to a handler function. 
 * 
 * <code>
 *      {
 *          '/test:GET': {
 *              'function': function (request, response) {}
 *          },
 *          '/test': ...
 *      }
 * </code>
 * 
 * Two other optionals key/values can be added as well. The first 'parameters' 
 * must map to an array of strings contain all the required request paramters 
 * for the handler function. The second 'optional-paramters' must map to the 
 * same type of array as 'parameters' only the request parameters named in this 
 * array are not compulsory for the handler to succeed.
 * 
 *  <code>
 *      {
 *          '/test:GET': {
 *              'function': function (request, response, one, two, three) {}
 *              'parameters': ['one', 'two', 'three']
 *          },
 *          '/test': {
 *              'function': function (request, response, four, five, six) {}
 *              'parameters': ['four']
 *              'optional-paramters': ['five', 'six']
 *          }
 *      }
 * </code>
 * 
 * @param handlers - a mapping of HTTP requests to handler functions.
 * @return a callback that can be regestered with the Node.js request event.
 */
function RequestHandlerResolver (handlers) {
  
    return function (request, response) {

        // If some custom request handlers have been supplied then check if one 
        // is available for the current request path.
        if (isNotBlank(handlers)) {
            // Parse the request URL to get easy access to it's different parts.
            var urlObject = url.parse(request.url, true);
            // Get the URL path name, this will be used to find the handler.
            var path = '/' + urlObject.pathname.split('/')[1];
            // Try and find a handler specific to the request path and method.
            var handler = handlers[path + REQUEST_DELIMITER + request.method];
            // If that fales try and find a more generic handler just with the 
            // request path.
            if(isBlank(handler)) handler = handlers[path];
            // If a handler is found attempt to run it.
            if(isNotBlank(handler)) {
                // The handlers function that will soon be exicuted.
                var func = handler[FUNCTION];
                // Any request parameters that are required for this handler.
                var paramNames = handler[PARAMETERS];
                // Any request parameters that are optional for this handler.
                var optionalParamNames = handler[OPTIONAL_PARAMETERS];
                // The parameters sent in by the current request.
                var parameters = urlObject.query;
                // An array that will hold the handlers parameter argument values.
                var paramValues = [];
                // If the handler has required parameters attempt to extract 
                // them from the request parameters.
                if(isNotBlank(paramNames)) {
                    
                    paramValues = paramValues.concat(
                        extractParameterValues(parameters, paramNames)
                        );
                    // If not all the requiered parameters could not be found 
                    // bail out now.
                    if (paramNames.length > paramValues.length) {
                
                        throw MissingRequestParameterError(
                            request, 
                            response, 
                            findMissingParameterNames(parameters, paramNames)
                            );
                    }
                }
                // If the handler has optional parameters attempt to extract 
                // them from the request parameters.
                if (isNotBlank(optionalParamNames)) {
                  
                    paramValues = paramValues.concat(
                        extractParameterValues(parameters, optionalParamNames)
                        );
                }
                // Exicute the handler function with any populated parameter 
                // values.
                func.apply(null, [request, response].concat(paramValues));
                
                return;
            }
        }

        throw PageNotFoundError(request, response);
    };
};


module.exports = RequestHandlerResolver;
