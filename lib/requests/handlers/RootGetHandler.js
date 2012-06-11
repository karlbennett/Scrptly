/**
 * Author: Karl Bennett
 */

var http = require('http');
var url = require('url');
var utils = require('../../utils/Utils');
var nodeUtils = require('../../utils/NodeUtils');
var domUtils = require('../../utils/DOMUtils');
var InvalidResponseCodeError = require('../../errors/InvalidResponseCodeError');
var DOMError = require('../../errors/DOMError');


var parse = url.parse;
var format = url.format;
var isNotBlank = utils.isNotBlank;
var writeResponse = nodeUtils.writeResponse;
var renderPage = domUtils.renderPage;
var parsePage = domUtils.parsePage;
var extractScriptUrls = domUtils.extractScriptUrls;
var removeExternalScriptTags = domUtils.removeExternalScriptTags;
var addScriptTags = domUtils.addScriptTags;


function GET(url, callback) {

    var request = http.request(url, function(response) {
        
        if (200 != response.statusCode) {
            
            callback(InvalidResponseCodeError(null, null, url, response.statusCode));
            
            return;
        }
        
        var html = '';
        
        response.on('data', function (chunk) {
            
            html += chunk;
        });
        
        response.on('close', function (error) {
            
            callback(error);
            
            return;
        });
        
        response.on('end', function (error) {
    
            if (isNotBlank(error)) {
                
                callback(error);
            
                return;
            }
            
            callback(null, html);
        });
    });
    
    request.end();
};

function POST(url, body, callback) {
    
    url.method = 'POST';

    var request = http.request(url, function(response) {
        
        var html = '';
        
        response.on('data', function (chunk) {
            
            html += chunk;
        });
        
        response.on('close', function (error) {
                
            callback(error);
            
            return;
        });
        
        response.on('end', function (error) {
    
            if (isNotBlank(error)) {
                
                callback(error);
            
                return;
            }
          
            callback(null, html);
        });
    });
    
    request.write(body);
    request.end();
};


function RootGetHandler (request, response, url) {

    renderPage(url, function (errors, window) {
       
        if (isNotBlank(errors)) {
                    
            throw DOMError(request, response, errors);
        }
       
        var scriptUrls = extractScriptUrls(window);
    
        parsePage(url, function (vanillaErrors, vanillaWindow) {

            if (isNotBlank(vanillaErrors)) {
                    
                throw DOMError(request, response, vanillaErrors);
            }

            var catUrl = 'http://' + request.headers.host + '/cat'

            var postBody = {
                page: format(url),
                scripts: scriptUrls
            };

            POST(parse(catUrl), JSON.stringify(postBody), 
                function (error, json){
            
                    json = JSON.parse(json);
                
                    vanillaWindow = removeExternalScriptTags(vanillaWindow);
                
                    vanillaWindow = addScriptTags(vanillaWindow, json.url);
                
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(vanillaWindow.document.innerHTML);
                    response.end();
                });
        });
    });
};


module.exports = RootGetHandler;
