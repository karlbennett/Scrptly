/** 
 * Author: Karl Bennett
 */

var http = require('http');
var RequestHandlerResolver = require('./requests/RequestHandlerResolver');
var ErrorHandlerResolver = require('./errors/ErrorHandlerResolver');
var ScrptlyRequestHandlers = require('./ScrptlyRequestHandlers');


http.createServer(RequestHandlerResolver(ScrptlyRequestHandlers)).listen(9032);

process.on('uncaughtException', ErrorHandlerResolver());

console.log('Scrptly started.');
