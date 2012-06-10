/**
 * Author: Karl Bennett
 */

var RootGetHandler = require('./requests/handlers/RootGetHandler');
var CatPostHandler = require('./requests/handlers/CatPostHandler');
var ScriptGetHandler = require('./requests/handlers/ScriptGetHandler');


var ScrptlyRequestHandlers = {

    '/:GET': {
        'function': RootGetHandler,
        'parameters': ['url']
    },
    
    '/cat:POST': {
        'function': CatPostHandler
    },
    
    '/script:GET': {
        'function': ScriptGetHandler
    }

};


module.exports = ScrptlyRequestHandlers;
