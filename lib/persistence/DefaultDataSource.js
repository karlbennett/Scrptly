/**
 * Author: Karl Bennett
 */

var utils = require('../utils/Utils');
var fs = require('fs');
var IllegalArgumentError = require('../errors/IllegalArgumentError');


var isBlank = utils.isBlank;
var isString = utils.isString;
var isArray = utils.isArray;


var DATA_DIR = './data/';
var INC = 0;
var DATA_SOURCE = {};

// Try and create the data directory that will hold the concatenated JavaScript 
// files.
try {
    
    if (!fs.statSync(DATA_DIR).isDirectory()) {
    
        var error = new Error(DATA_DIR + ' is not a directory.');
        error.name = 'CannotCreateDirectory';
    
        throw error;
    } 
    
} catch (error) {

    if (error.code === 'ENOENT') fs.mkdirSync(DATA_DIR);
    else throw error;
}

/**
 * Generate a new id for some concatinated JavaScript.
 */
function generateID() {
  
    INC++;

    var id = new Buffer(INC.toString()).toString('base64');

    return id.replace('==', '');
};

/**
 * Create a new entry for some concatinated JavaScript.
 * 
 * @param scriptURLs - an array of all the urls used to create the concatinated 
 *      JavaScript code.
 * @param code - the concatinated JavaScript code.
 * @return the id for the new entry.
 */
function create(scriptURLs, code) {
    
    scriptURLs = scriptURLs.slice();
    scriptURLs.sort();
 
    var id = DATA_SOURCE[scriptURLs];

    if (isBlank(id)) {
        
        id = generateID();
            
        DATA_SOURCE[scriptURLs] = id;
    }
    
    var filename = DATA_DIR + id;
    
    fs.writeFileSync(filename, code);
    
    return id;
};

/**
 * Request some persisted JavaScript code through either it's id or the array of 
 * urls used to generate it.
 * 
 * @param id - the id or urls related to the concatinated JavaScript code.
 * @return the concatinated JavaScript code.
 */
function request(id, callback) {
    
    var filename;
    
    if (isString(id)) {
        
        filename = DATA_DIR + id;
        
    } else if (isArray(id)) {
        
        id = id.slice();
        id.sort();
        
        filename = DATA_SOURCE[id];
    }
 
    if (isBlank(filename)) {
        
        callback(IllegalArgumentError(
            null, 
            null, 
            'The JavaScript related to the supplied id (' + id + ') could not be found.', 
            'id'
            )); 
    }

    fs.readFile(filename, 'UTF-8', callback);
};


exports.create = create;
exports.request = request;