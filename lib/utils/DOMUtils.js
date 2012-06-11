/**
 * Author: Karl Bennett
 */

var jsdomUtils = require("jsdom");
var utils = require('./Utils');


var jsdom = jsdomUtils.jsdom;
var isNotBlank = utils.isNotBlank;
var isBlank = utils.isBlank;
var isString = utils.isString;


/**
 * Invode the jsdom.env function using the provided features and callback. The 
 * callback will not be executd till the DOM window object created by jsdom has 
 * completed loading.
 * 
 * The supplied callback should have the following signature.
 * <code>
 *     jsdomInvoker(html, features, function (errors, window) {});
 * </code>
 * 
 * Where 'errors' is an array containing any errors that might have occured 
 * during the parsing of the HTML and 'window' is a DOM window object created by 
 * jsdom.
 * 
 * @param html - the url, html string, or file for the page that is to be 
 *      rendered.
 * @param features - a map of jsdom features and values that will confugire the 
 *      parsing of the HTML. {@see https://github.com/tmpvar/jsdom#flexibility}
 * @param callback - the callback function that will be executed once the page 
 *     has finished rendering.
 */
function jsdomInvoker(html, features, callback) {
    
    jsdomUtils.env({
        html: html,
        
        features: features,
        
        done: function(errors, window) {
            
            // Fail early if there were errors parsing the HTML.
            if (isNotBlank(errors)) {
                
                callback(errors, window);
                
                return;
            }
            
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
 * @param @param html - the url, html string, or file for the page that is to be 
 *      rendered.
 * @param callback - the callback function that will be executed once the page 
 *     has finished rendering.
 */
function renderPage(html, callback) {
    
    jsdomInvoker(
        html, 
        {
            FetchExternalResources   : ['script'],
            ProcessExternalResources : ['script'],
            MutationEvents           : '2.0',
            QuerySelector            : false
        }, 
        callback
        );
};

/**
 * Synchronously parse the supplied HTML into a DOM object. None of the 
 * JavaScript within the page will be runn.
 * 
 * @param @param html - the url, html string, or file for the page that is to be 
 *      rendered.
 * @param callback - the callback function that will be executed once the page 
 *     has finished rendering.
 */
function parsePage(html, callback) {
    
    jsdomInvoker(
        html, 
        {
            FetchExternalResources   : false,
            ProcessExternalResources : false,
            MutationEvents           : false,
            QuerySelector            : false
        },
        callback
        );
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
    
    if (isBlank(window)) return [];
    
    var scriptTags = window.document.getElementsByTagName('script');
    
    var scriptUrls = [];
    
    for (var i = 0; i < scriptTags.length; i++) {
        
        var url = scriptTags[i].getAttribute('data-requiremodule');
        
        if (isBlank(url)) url = scriptTags[i].getAttribute('src');
        
        if (isNotBlank(url)) scriptUrls.push(url);
    }
    
    return scriptUrls;
};

/**
 * Remove all the <code><script/></code> tags from the supplied DOM window 
 * object that contain src links to external JavaScript script files. Unless the 
 * <code><script/></code> tag contains inline JavaScript, in that case just 
 * remove the src attribute.
 * 
 * Note: This function will mutate the DOM object passed into it. It does not 
 * make an internal copy.
 * 
 * @param window - the DOM window object to remove all the 
 *      <code><script/></code> tags from.
 * @return the modified DOM window object.
 */
function removeExternalScriptTags(window) {
    
    if (isBlank(window)) return window;
    
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
};

/**
 * Add a new <code><script/></code> tag to the supplied DOM window object.
 * 
 * Note: This function will mutate the DOM object passed into it. It does not 
 * make an internal copy.
 * 
 * @param window - the DOM window object to have <code><script/></code> tags 
 *      added to it.
 * @param scriptUrls - the src urls for the new <code><script/></code> tags.
 * @return the modified DOM window object.
 */
function addScriptTag(window, scriptUrl) {
   
    if (isBlank(window) || isBlank(scriptUrl)) return window;
    
    var document = window.document;
    
    var head = window.document.head;
    
    var firstElement = head.firstChild;
    
    var text = document.createTextNode('\n');
    
    head.insertBefore(text, firstElement);
    
    var script = document.createElement('script');
    
    script.setAttribute('src', scriptUrl);
    
    head.insertBefore(script, firstElement);
    
    text = document.createTextNode('\n');
    
    head.insertBefore(text, firstElement);
    
    return window;
};

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
    
    if (isBlank(window) || isBlank(scriptUrls)) return window;
    
    // If we have just been given a single url for the second argument then add 
    // a single script tag.
    if (isString(scriptUrls)) return addScriptTag(window, scriptUrls);
       
    for (var i = 0; i < scriptUrls.length; i++) {
        
        addScriptTag(window, scriptUrls[i]);
    }
    
    return window;
};


exports.renderPage = renderPage;
exports.parsePage = parsePage;
exports.extractScriptUrls = extractScriptUrls;
exports.removeExternalScriptTags = removeExternalScriptTags;
exports.addScriptTags = addScriptTags;
