// Some test JavaScript

if (typeof define === 'undefined') {
    
    var define = function () {};
}

define(function () {
    
    function appendText() {
        
        window.document.body.innerHTML += '<br/>Script 2 has run.';
    };
    
    return {appendText: appendText};
});