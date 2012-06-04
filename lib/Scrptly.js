/** 
 * Author: Karl Bennett
 */

var http = require('http');
var RequestHandlerResolver = require('./requests/RequestHandlerResolver');
var ErrorHandlerResolver = require('./errors/ErrorHandlerResolver');


http.createServer(RequestHandlerResolver()).listen(9032);

process.on('uncaughtException', ErrorHandlerResolver());

console.log('Scrptly started.');
