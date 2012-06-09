/** 
 * Author: Karl Bennett
 */

var http = require('http');
var RequestHandlerResolver = require('./lib/requests/RequestHandlerResolver');
var ErrorHandlerResolver = require('./lib/errors/ErrorHandlerResolver');
var ScrptlyRequestHandlers = require('./lib/ScrptlyRequestHandlers');


http.createServer(RequestHandlerResolver(ScrptlyRequestHandlers)).listen(9032);

process.on('uncaughtException', ErrorHandlerResolver());

console.log('Scrptly started.');
