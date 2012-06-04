/**
 * Author: Karl Bennett
 */

var RootGetHandler = require('./requests/handlers/RootGetHandler');


var ScrptlyRequestHandlers = {

    '/:GET': {
        'function': RootGetHandler,
        'parameters': ['url']
    }

};


module.exports = ScrptlyRequestHandlers;
