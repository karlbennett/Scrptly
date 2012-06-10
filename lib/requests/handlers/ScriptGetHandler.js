/**
 * Author: Karl Bennett
 */

var dataSource = require('../../persistence/DefaultDataSource');
var utils = require('../../utils/Utils');


var isNotBlank = utils.isNotBlank;


function ScriptGetHandler (request, response) {
    
    var id = request.url.replace('/script/', '');
    
    dataSource.request(id, function (error, code) {
       
        if (isNotBlank(error)) {
           
            error.request = request;
            error.response = response;
           
            throw error;
        }
       
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.write(code);
        response.end();
    });
};


module.exports = ScriptGetHandler;
