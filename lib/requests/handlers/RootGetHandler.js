/**
 * Author: Karl Bennett
 */

var http = require('http');
var url = require('url');
var utils = require('../../utils/Utils');
var nodeUtils = require('../../utils/NodeUtils');
var InvalidResponseCodeError = require('../../errors/InvalidResponseCodeError');


var parse = url.parse;
var isDefined = utils.isDefined;
var writeResponse = nodeUtils.writeResponse;


function RootGetHandler (request, response, url) {

    var req = http.request(parse(url), function(res) {
        
        if (200 != res.statusCode) throw InvalidResponseCodeError(request, response, url);
        
        response.writeHead(res.statusCode, {'Content-Type': 'text/html'});
        
        res.on('data', function (chunk) {
            
            response.write(chunk);
        });
        
        res.on('close', function (error) {
            
            throw error;
        });
        
        res.on('end', function (error) {
            
            response.end();
        });
    });
    
    req.end();
};


module.exports = RootGetHandler;
