/** 
 * Author: Karl Bennett
 */

var http = require('http');
var RequestHandler = require('./RequestHandler');


http.createServer(RequestHandler()).listen(9032);

console.log('Scrptly started.');
