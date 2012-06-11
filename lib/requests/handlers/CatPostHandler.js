/**
 * Author: Karl Bennett
 */

var utils = require('../../utils/Utils');
var cat = require('../../concatenation/Cat').cat;
var dataSource = require('../../persistence/DefaultDataSource');
var MissingRequestBodyError = require('../../errors/MissingRequestBodyError');
var InvalidBodyFormatError = require('../../errors/InvalidBodyFormatError');
var MissingScriptUrlsError = require('../../errors/MissingScriptUrlsError');
var IllegalArgumentError = require('../../errors/IllegalArgumentError');


var isNotBlank = utils.isNotBlank;
var isBlank = utils.isBlank;
var isNotArray = utils.isNotArray;

var BODY_TEMPLAT = '{\n    "scripts": [\n        "<script url>",\n        "<script url>"\n    ]\n}';
var URL_MAP = {};


function CatPostHandler (request, response) {
 
    var body = '';

    request.on('data', function (chunk) {
            
        body += chunk;
    });
        
    request.on('close', function (error) {
            
        throw error;
    });
        
    request.on('end', function (error) {
        
        if (isBlank(body)) {
            
            throw MissingRequestBodyError(request, response, BODY_TEMPLAT);
        }
 
        var bodyMap;
        
        try {
         
            bodyMap = JSON.parse(body);
            
        } catch (error) {
           
            throw InvalidBodyFormatError(request, response, BODY_TEMPLAT, body);
        }
        
        if (typeof bodyMap.scripts !== 'object') {
            
            throw InvalidBodyFormatError(request, response, BODY_TEMPLAT, body);
        }
        
        if (isBlank(bodyMap.scripts) || isNotArray(bodyMap.scripts)) {
            
            throw MissingScriptUrlsError(request, response);
        }

        cat(bodyMap.page, bodyMap.scripts, function (error, code) {
      
            if (isNotBlank(error)) {
                
                error.request = request;
                error.response = response;

                throw error;
            }
            
            if (isBlank(code)) {
                
                throw IllegalArgumentError(request, response, 
                    'No JavaScript code retrieved.', 'code')
            }
            
            var id = dataSource.create(bodyMap.scripts, code);
            
            var path = '/script/' + id;
            
            var url = 'http://' + request.headers.host + path;
            
            var responseBodyMap = {url: url};
            
            response.writeHead(302, {
                'Content-Type': 'application/json',
                'Location': path
            });
            response.write(JSON.stringify(responseBodyMap));
            response.end();
        });
    });
}


module.exports = CatPostHandler;
