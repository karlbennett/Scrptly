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
            
            var urlObject = url.parse(request.url, true);
            var path = urlObject.pathname;
        
            var handler = handlers[path + REQUEST_DELIMITER + request.method];

            if(isBlank(handler)) handler = handlers[path];
        
            if(isNotBlank(handler)) {
                
                var func = handler[FUNCTION];
                var paramNames = handler[PARAMETERS];

                if (isBlank(paramNames)) {
                    
                    func(request, response);
                    
                    return;
                } 

                var parameters = urlObject.query;

                var paramValues = extractParameterValues(parameters, paramNames);

                if (paramNames.length <= paramValues.length) {
                    
                    func.apply(null, [request, response].concat(paramValues));
                    
                    return;
                }
                
                throw MissingRequestParameterError(
                    request, 
                    response, 
                    findMissingParameterNames(parameters, paramNames)
                    );
            }
        }

        throw PageNotFoundError(request, response);
    };
};


module.exports = RequestHandlerResolver;
