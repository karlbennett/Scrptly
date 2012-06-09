/**
 * Author: Karl Bennett
 */

var http = require('http');
var url = require('url');
var utils = require('../../utils/Utils');
var nodeUtils = require('../../utils/NodeUtils');
var domUtils = require('../../utils/DOMUtils');
var InvalidResponseCodeError = require('../../errors/InvalidResponseCodeError');


var parse = url.parse;
var writeResponse = nodeUtils.writeResponse;
var renderPage = domUtils.renderPage;
var parsePageSync = domUtils.parsePageSync;
var extractScriptUrls = domUtils.extractScriptUrls;
var removeScriptTags = domUtils.removeScriptTags;
var addScriptTags = domUtils.addScriptTags;


function RootGetHandler (request, response, url) {

    var req = http.request(parse(url), function(res) {
        
        if (200 != res.statusCode) {
            
            throw InvalidResponseCodeError(request, response, url, res.statusCode);
        }
        
        var html = '';
        
        res.on('data', function (chunk) {
            
            html += chunk;
        });
        
        res.on('close', function (error) {
            
            throw error;
        });
        
        res.on('end', function (error) {
    
            renderPage(html, function (errors, window) {
       
                var scriptUrls = extractScriptUrls(window);
                
                var vanillaWindow = parsePageSync(html);
                
                vanillaWindow = removeScriptTags(vanillaWindow);
                
                vanillaWindow = addScriptTags(vanillaWindow, scriptUrls);
                
                response.writeHead(res.statusCode, {
                    'Content-Type': 'text/html'
                });
                response.write(vanillaWindow.document.innerHTML);
                response.end();
            });
        });
    });
    
    req.end();
};


module.exports = RootGetHandler;
