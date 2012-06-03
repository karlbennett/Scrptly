/**
 * Author: Karl Bennett
 */

var fs = require('fs');

var DIR = './';

var fileName = __filename.replace(__dirname + '/', '');


/**
 * Test if the provided variable is defined.
 * 
 * @param variable - the variable to test.
 * @return true if the variable is define, otherwise false.
 */
function isDefined (variable) {
    
    return typeof variable !== 'undefined';
}


// Run through all the test files in the current directory and exicute all the 
// tests within them.
fs.readdir(DIR, function (err, files) {

    if (err) throw err; // Die if the current directory cannot be read.

    var testFiles = [];

    // Iterate over all the files within the current directory and only keep the 
    // test files.
    for (var i in files) {

        if (fileName !== files[i] && -1 != files[i].toLowerCase().indexOf('test')) {

            testFiles.push(files[i]);
        }
    }

    // Iterate over the test files and runn all the test within them.
    for (var i in testFiles) {

        var tests = require(DIR + testFiles[i]);

        for (var test in tests) {
            
            try {
                
                tests[test]();
                
            } catch(error) {
                
                var message = 'Failed ' + test + '.';
                
                if(isDefined(error.expected)) message += ' Expected: [' + error.expected + ']';
                if(isDefined(error.actual)) message += ' Actual: [' + error.actual + ']';
                if(isDefined(error.message)) message += ' Message: "' + error.message + '"';
                
                console.error(message);
            }
        }
    }
});