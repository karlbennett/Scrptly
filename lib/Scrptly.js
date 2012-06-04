/** 
 * Author: Karl Bennett
 */

var http = require('http');
var RequestHandlerResolver = require('./requests/RequestHandlerResolver');


http.createServer(RequestHandlerResolver()).listen(9032);

console.log('Scrptly started.');
