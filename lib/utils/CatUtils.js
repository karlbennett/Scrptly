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


function absoluteUrl(host, path, url) {

    if (0 == url.indexOf('./')) {
            
        return host + path + url.substring(1);
            
    } 
    
    if (0 == url.indexOf('/')) {
            
        return host + url;
    } 
    
    if (0 != url.indexOf('http')) {
            
        return host + '/' + url;
    } 
            
    return url;
};

/**
 * Retieve the JavaScript code from the file at the supplied url. The function 
 * takes a callback that will be supplied with the JavaScript code.
 * 
 * <code>
 *     retrieveScript(scriptUrl, function (error, code) {});
 * </code>
 * 
 * @param host - the host portion of the url for the page that contained the 
 *      scripts.
 * @param path - the path portion of the url for the page that contained the 
 *      scripts.
 * @param scriptUrl - the url for the JavaScript file to retrieve the code from.
 * @param callback - the callback to supply the code to.
 */
function retrieveScript(host, path, scriptUrl, callback) {
  
    var absUrl = absoluteUrl(host, path, scriptUrl); 
  
    var req = http.request(url.parse(absUrl), function(response) {
        
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
            
            var defineRegex = /define *\( *((function)|\[)/;
           
            var defineMatch = defineRegex.exec(code);

            if (isNotBlank(defineMatch)) {
                
                code = code.replace(
                    defineRegex, 
                    "define('" + scriptUrl + "', " + defineMatch[1]
                    );
            }

            callback(null, code);
        });
    });
    
    req.end();
};

/**
 * Retieve the and concatinate the JavaScript code from the files at the 
 * supplied urls. The code will be concatinated in the order of the urls in the 
 * supplied array. Also any define blocks will have it's name set to the script 
 * src url if it does not already have a name. This concatinated JavaScript will 
 * then provided to the callback function.
 * 
 * <code>
 *     retrieveScripts(host, path, scriptUrls, function (error, code) {});
 * </code>
 * 
 * @param host - the host portion of the url for the page that contained the 
 *      scripts.
 * @param path - the path portion of the url for the page that contained the 
 *      scripts.
 * @param scriptUrls - the url for the JavaScript file to retrieve the code from.
 * @param callback - the callback to supply the code to.
 * @param previousCode - an optional argument that can be used to provide any 
 *      previously retrieved code.
 */
function retrieveScripts(host, path, scriptUrls, callback, previousCode) {
    
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
        callback(IllegalArgumentError(null, null, 
            'retrieveScripts() scriptUrls agrument must be either an array or string.', 
            'scriptUrls'));
      
        return;
    }
    
    retrieveScript(host, path, scriptUrl, function (error, code) {
        
        if(isNotBlank(error)) {
            
            callback(error);
            
            return;
        }
        
        if (isBlank(previousCode)) {
            
            previousCode = code;
            
        } else {
            
            previousCode += '\n' + code;
        }
        
        retrieveScripts(host, path, scriptUrls, callback, previousCode)
    });
};


exports.retrieveScripts = retrieveScripts;
