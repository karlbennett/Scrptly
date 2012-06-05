/**
 * Author: Karl Bennett
 */

var jsdomUtils = require("jsdom");


var jsdom = jsdomUtils.jsdom;


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
}


exports.renderPageSync = renderPageSync;
exports.renderPage = renderPage;
