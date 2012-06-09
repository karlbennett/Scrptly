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
function renderPage(urlOrHtml, callback) {
    
    jsdomUtils.env({
        html: urlOrHtml,
        
        features: {
            FetchExternalResources   : ['script'],
            ProcessExternalResources : ['script'],
            MutationEvents           : '2.0',
            QuerySelector            : false
        },
        
        done: function(errors, window) {
            
            // Don't execute the callback till the document has finished loading.'
            var executeCallback = setInterval(function() {
                
                if (window.document.readyState === "complete") {
                    
                    callback(errors, window);
                    
                    clearInterval(executeCallback);
                }
            }, 10);
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
    
    var window = jsdom(html).createWindow();
    
    // Wait till the page has rendered.
    while (window.document.readyState !== "complete") {}
    
    return window;
};

/**
 * Synchronously parse the supplied HTML into a DOM object. None of the 
 * JavaScript within the page will be runn.
 * 
 * @param html - the HTML string to parse into a DOM object.
 * @return a window DOM object populated from the supplied HTML string.
 */
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

/**
 * Extract all the <code><script/></code> tag src urls from the supplied DOM 
 * window object.
 * 
 * @param window - the DOM window object to extract <code><script/></code> tag 
 *      src urls from.
 * @return an array of the <code><script/></code> tag src urls strings.
 */
function extractScriptUrls(window) {
    
    var scriptTags = window.document.getElementsByTagName('script');
    
    var scriptUrls = [];
    
    for (var i = 0; i < scriptTags.length; i++) {
        
        var url = scriptTags[i].getAttribute('src');
        
        if (isNotBlank(url)) scriptUrls.push(url);
    }
    
    return scriptUrls;
}

/**
 * Remove all the <code><script/></code> tags from the supplied DOM window 
 * object.
 * 
 * Note: This function will mutate the DOM object passed into it. It does not 
 * make an internal copy.
 * 
 * @param window - the DOM window object to remove all the 
 *      <code><script/></code> tags from.
 * @return the modified DOM window object.
 */
function removeScriptTags(window) {
    
    var scriptTags = window.document.getElementsByTagName('script');
    
    for (var i = 0; i < scriptTags.length; i++) {
        
        if (isNotBlank(scriptTags[i].innerHTML)) {
            
            scriptTags[i].removeAttribute('src');
        
        } else {
            
            var parent = scriptTags[i].parentNode;
            
            parent.removeChild(scriptTags[i]);
        }
    }
    
    return window;
}

/**
 * Add new <code><script/></code> tags to the supplied DOM window object.
 * 
 * Note: This function will mutate the DOM object passed into it. It does not 
 * make an internal copy.
 * 
 * @param window - the DOM window object to have <code><script/></code> tags 
 *      added to it.
 * @param scriptUrls - the src urls for the new <code><script/></code> tags.
 * @return the modified DOM window object.
 */
function addScriptTags(window, scriptUrls) {
    
    var document = window.document;
    
    var head = window.document.head;
    
    var text = document.createTextNode('\n');
    
    head.appendChild(text);
    
    for (var i = 0; i < scriptUrls.length; i++) {
        
        var script = document.createElement('script');
        
        script.setAttribute('src', scriptUrls[i]);
        
        head.appendChild(script);
        
        text = document.createTextNode('\n');
        
        head.appendChild(text);
    }
    
    return window;
}


exports.renderPage = renderPage;
exports.renderPageSync = renderPageSync;
exports.parsePageSync = parsePageSync;
exports.extractScriptUrls = extractScriptUrls;
exports.removeScriptTags = removeScriptTags;
exports.addScriptTags = addScriptTags;
