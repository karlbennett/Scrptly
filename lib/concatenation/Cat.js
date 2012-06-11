/**
 * Author: Karl Bennett
 */

var pathUtil = require('path');
var urlUtil = require('url');
var fs = require('fs');
var http = require('http');
var utils = require('../utils/Utils');
var ConcatenationError = require('./ConcatenationError');
var IllegalArgumentError = require('../errors/IllegalArgumentError');


var isBlank = utils.isBlank;
var isNotBlank = utils.isNotBlank;
var isArray = utils.isArray;
var isString = utils.isString;


/**
 * Sanitise the concatinated JavaScript code by making sure that if the code 
 * contains a call to 'define' that the call contains a name. If the 'define' 
 * call does not contain a name it will be modified so that the supplied uri is 
 * it's name.
 * 
 * @param code - the JavaScript code that will be sanitised.
 * @param uri - the uri that will be used as the name for any nameless 'define' 
 *      call contained within the code.
 * @return the sanitised JavaScript code.
 */
function sanitise(code, uri) {
    
    var defineRegex = /define *\( *((function)|\[)/;
           
    var defineMatch = defineRegex.exec(code);

    if (isNotBlank(defineMatch)) {
                
        code = code.replace(
            defineRegex, 
            "define('" + uri + "', " + defineMatch[1]
            );
    }
    
    return code;
};

/**
 * Extract the string contents of the file at the supplied path and provided it 
 * as the second argument to the supplied callback. The first argument will be 
 * populated with an error if one occures.
 * 
 * <code>
 *      catFile(path, function (error, data) {});
 * </code>
 * 
 * @param path - the path to the text file that is to have it's contents 
 *      extracted.
 * @param callback - the callback that will be provided with the contents of the 
 *      file.
 */
function catFile(path, callback) {

    fs.readFile(path, 'UTF-8', callback);
};

/**
 * Extract the string contents of the file at the supplied url and provided it 
 * as the second argument to the supplied callback. The first argument will be 
 * populated with an error if one occures.
 * 
 * <code>
 *      catPage(url, function (error, data) {});
 * </code>
 * 
 * @param url - the url to the text file that is to have it's contents 
 *      extracted.
 * @param callback - the callback that will be provided with the contents of the 
 *      file.
 */
function catPage(url, callback) {

    var request = http.request(urlUtil.parse(url), function(response) {
        
        if (200 != response.statusCode) {
            
            callback(ConcatenationError('Could not access file at ' + url, url));
            
            return;
        }
        
        var data = '';
        
        response.on('data', function (chunk) {
            
            data += chunk;
        });
        
        response.on('close', function (error) {
            
            callback(error);
        });
        
        response.on('end', function (error) {
    
            if (isNotBlank(error)) callback(error);
            
            callback(null, data);
        });
    });
    
    request.end();
};

/**
 * Concatenate together all the files at the supplied uri's and provided the 
 * complete text to the second argument of the supplied callback. The first 
 * argument will be populated with an error if one occures.
 * 
 * <code>
 *      cat(base, uris, function (error, data) {});
 * </code>
 * 
 * @param base - the base path for the supplied uri's. If the uri's point to 
 *      HTTP resouces then the base could be the page that the uri's were 
 *      extracted from. If the uri's are for local files then the base could be 
 *      the current running directory.
 * @param uris - an array of uri's that point to the files that should be 
 *      concatinated.
 * @param callback - the callback that will be called with the concatenated data 
 *      once all the files have been processed.
 * @param previouseData (optional) - this is an optional argument that can be 
 *      used to provide any other data that should be prepended to the 
 *      concatenated files.
 */
function cat(base, uris, callback, previouseData) {
    
    if(null != uris && isBlank(uris)) {
        
        callback(null, previouseData);
        
        return;
    } 
    
    var uriHead;
    
    var uriTail;
    // Check to see if the uris argument has been given an array or just a 
    // single string then populate the uriHead and uriTail accordingly.
    if (isArray(uris)) {
        
        uriHead = uris[0];
        uriTail = uris.slice(1);
        
    } else if (isString(uris)) {
        
        uriHead = uris;
        // Set the tail to an empty array so as not to break the recursion.
        uriTail = [];
        
    } else {
        
        callback(
            IllegalArgumentError('Uris argument must be an array or string.\n uris: ' 
                + uris, 'uris')
            );
                
        return;
    }
    // Get an absolute uri so that the cat* functions can access the files.
    var absoluteUri = urlUtil.resolve(base, uriHead);
    // Test to see if the file uri exists on the local file system. If it does 
    // then use the catFile function. Otherwise it is more than likely an 
    // external HTTP resource so use catPage.
    var func = pathUtil.existsSync(absoluteUri) ? catFile : catPage;
   
    func(absoluteUri, function (error, data) {
       
        if(isNotBlank(error)) {
           
            callback(error);
           
            return;
        }
        // Sanitise the files data so that any 'define' calls can be resolved 
        // correctly.
        data = sanitise(data, uriHead);
        
        if(isBlank(previouseData)) previouseData = data;
        else previouseData += data;
       
        cat(base, uriTail, callback, previouseData);
    });
};


exports.cat = cat;
