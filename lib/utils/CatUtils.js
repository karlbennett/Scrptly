/**
 * Author: Karl Bennett
 */

var http = require('http');
var url = require('url');
var utils = require('./Utils');
var InvalidResponseCodeError = require('../errors/InvalidResponseCodeError');
var IllegalArgumentError = require('../errors/IllegalArgumentError');


var isNotBlank = utils.isNotBlank;
var isBlank = utils.isBlank;
var isArray = utils.isArray;
var isString = utils.isString;


/**
 * Retieve the JavaScript code from the file at the supplied url. The function 
 * takes a callback that will be supplied with the JavaScript code.
 * 
 * <code>
 *     retrieveScript(scriptUrl, function (error, code) {});
 * </code>
 * 
 * @param scriptUrl - the url for the JavaScript file to retrieve the code from.
 * @param callback - the callback to supply the code to.
 */
function retrieveScript(scriptUrl, callback) {
  
  var req = http.request(url.parse(scriptUrl), function(response) {
        
        if (200 != response.statusCode) {
            
            callback(InvalidResponseCodeError(null, null, scriptUrl, response.statusCode));
            
            return;
        }
        
        var code = '';
        
        response.on('data', function (chunk) {
            
            code += chunk;
        });
        
        response.on('end', function (error) {
    
            if (isNotBlank(error)) callback(error);
            
            callback(null, code);
        });
    });
    
    req.end();
};

/**
 * Retieve the and concatinate the JavaScript code from the files at the 
 * supplied urls. The code will be concatinated in the order of the urls in the 
 * supplied array. This concatinated JavaScript will then provided to the 
 * callback function.
 * 
 * <code>
 *     retrieveScripts(scriptUrls, function (error, code) {});
 * </code>
 * 
 * @param scriptUrl - the url for the JavaScript file to retrieve the code from.
 * @param callback - the callback to supply the code to.
 * @param previousCode - an optional argument that can be used to provide any 
 *      previously retrieved code.
 */
function retrieveScripts(scriptUrls, callback, previousCode) {
    
    // If the scriptUrls array is empty we have finished processing so call the 
    // callback.
    if (isBlank(scriptUrls) && isArray(scriptUrls)) {
        
        callback(null, previousCode);
        
        return;
    }
    
    var scriptUrl;
    // Check to make sure that scriptUrls is either an array or string.
    if (isArray(scriptUrls)) {
        
        scriptUrl = scriptUrls.shift();
        
    } else if (isString(scriptUrls)) {
        // If scriptUrls is a string place the string in scriptUrl.
        scriptUrl = scriptUrls;
        // Then set scriptUrls to an empty arry so the recursion doesn't break.'
        scriptUrls = [];
        
    } else {
        // If scriptUrls is neither a string or an array then send an error to 
        // the callback.
        callback(IllegalArgumentError(null, null, 'scriptUrls'));
      
        return;
    }
    
    retrieveScript(scriptUrl, function (error, code) {
        
        if(isNotBlank(error)) {
            
            callback(error);
            
            return;
        }
        
        if (isBlank(previousCode)) {
            
            previousCode = code;
            
        } else {
            
            previousCode += '\n' + code;
        }
        
        retrieveScripts(scriptUrls, callback, previousCode)
    });
};


exports.retrieveScripts = retrieveScripts;
