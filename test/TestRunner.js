/**
 * Author: Karl Bennett
 */

var fs = require('fs');

var DIR = './';

var fileName = __filename.replace(__dirname + '/', '');

function runTests (dir) {
    
    return function (err, files) {

        if (err) throw err; // Die if the current directory cannot be read.

        var testFiles = [];

        // Iterate over all the files within the current directory and only keep
        // the test files.
        for (var i in files) {
            
            var file = dir + files[i];

            if (
                fileName !== file && 
                -1 != file.toLowerCase().indexOf('test')
                ) {

                testFiles.push(file);
            
            // If the file is not a test file check to see if it is a 
            // subdirectory.
            } else if (fs.statSync(file).isDirectory()) {
            
                // If it is recursively call the runTests function on the 
                // subdirectory.
                fs.readdir(file, runTests(file + '/'));
            }
        }

        // Iterate over the test files and runn all the test within them.
        for (var i in testFiles) {

            var tests = require(testFiles[i]);

            for (var test in tests) {
                // Run each test and display an error message on each failure.
                try {
                
                    tests[test]();
                
                } catch(error) {
                
                    var message = 'Failed ' + test + '.';
                
                    if (error.name === 'AssertionError') {

                        message += ' Expected: [' + error.expected + ']';
                        message += ' Actual: [' + error.actual + ']';
                        message += ' Message: "' + error.message + '"';

                    } else {
                    
                        message += ' Error: ' + error.name;
                        message += ' Message: "' + error.message + '"';
                        message += '\n' + error.stack;
                    }
                
                    console.error(message);
                }
            }
        }
    };
};


// Run through all the test files in the current directory and exicute all the 
// tests within them.
fs.readdir(DIR, runTests(DIR));