/**
 * Author: Karl Bennett
 */

var jsdomUtils = require("jsdom");
var utils = require('./Utils');


var jsdom = jsdomUtils.jsdom;
var isNotBlank = utils.isNotBlank;


/**
 * Rendoer the page at the supplied url and pass the resulting window DOM object 
 * into the supplied callback.
 * 
 * The callback should have the following signature:
 * <code>
 *      function (errors, window) {};
 * </code>
 * 
 * Where 'window' is the DOM object for the pages rendered HTML and 'errors' is 
 * an array of any errors that might have occured during the rendering.
 * 
 * @param url - the url for the page that is to be rendered.
 * @param callback - the callback function that will be executed once the page 
 *     has finished rendering.
 */
function renderPage(url, callback) {

    jsdomUtils.env({
        html: url,
    
        features: {
            FetchExternalResources   : ['script'],
            ProcessExternalResources : ['script'],
            MutationEvents           : '2.0'
        },
    
        done: function(errors, window) {

            callback(errors, window);
        }
    });
};

/**
 * Synchronously render the supplied HTML and return a window DOM object. All 
 * the inline Javascript within the page will be run during the page rendering.
 * 
 * @param html - the HTML string to render into a DOM object.
 * @return a window DOM object populated from the supplied HTML string.
 */
function renderPageSync(html) {
    
    return jsdom(html).createWindow();
};

function parsePageSync(html) {
  
    return jsdom(html, null, {
        features: {
            FetchExternalResources   : false,
            ProcessExternalResources : false,
            MutationEvents           : false,
            QuerySelector            : false
        }
    }).createWindow();
};

function replaceScripts(window, scripts) {

    var scriptUrls = [];
    var scriptCode = [];
    
    for (var i = 0; i < scripts.length; i++) {
        
        var url = scripts[i].getAttribute('src');
        var code = scripts[i].innerHTML;
        
        if (isNotBlank(url)) scriptUrls.push(url);
        if (isNotBlank(code)) scriptCode.push(code);
    }

    var oldScripts = window.document.getElementsByTagName('script');

    for (var i = 0; i < oldScripts.length; i++) {
        
        var parent = oldScripts[i].parentNode;

        parent.removeChild(oldScripts[i]);
    }
    
    var script = window.document.createElement('script');
    
    script.innerHTML += '<!--\n/*';
    
    for (var i = 0; i < scriptUrls.length; i++) {
        
        script.innerHTML += '\n' + scriptUrls[i];
    }
    
    for (var i = 0; i < scriptCode.length; i++) {
        
        script.innerHTML += '\n' + scriptCode[i];
    }
    
    script.innerHTML += '\n*/\n// -->';
    
    window.document.head.appendChild(script);

    return window;
}


exports.renderPageSync = renderPageSync;
exports.renderPage = renderPage;
exports.parsePageSync = parsePageSync;
exports.replaceScripts = replaceScripts;
