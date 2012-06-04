/** 
 * Author: Karl Bennett
 */

var http = require('http');
var RequestHandler = require('./requests/RequestHandler');


http.createServer(RequestHandler()).listen(9032);

console.log('Scrptly started.');
