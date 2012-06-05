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
//var isDefined = utils.isDefined;
var writeResponse = nodeUtils.writeResponse;
var renderPageSync = domUtils.renderPageSync;
var parsePageSync = domUtils.parsePageSync;
var replaceScripts = domUtils.replaceScripts;


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
            
            var window = renderPageSync(html);

            window.onload = function () {

                window = replaceScripts(parsePageSync(html), window.document.getElementsByTagName('script'));
                
                response.writeHead(res.statusCode, {'Content-Type': 'text/html'});
                response.write(window.document.innerHTML);
                response.end();
            }
        });
    });
    
    req.end();
};


module.exports = RootGetHandler;
