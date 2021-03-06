*NOTE:* Pretty much none of the functionality below is working, but hopefully it will soon enough.

Scrptly
=======

Scrptly can be used as a simple way to concatenate all you JavaScript into one large download. 
This can help speed up the loading of a web page as well as reduce the amount of data used by removing a lot of the HTML header information that will be sent for each script request.


HTML Manipulation
-----------------

Scrptly does this by scanning all the `<script/>` tags within the HTML, it then replaces them with a single `<script/>` tag that contains a URL to a generated concatenation of all the previous JavaScript.

The concatenated JavaScript and URL are both generated by Scrptly, either internally or by a configurable external source.

Scrptly is extremely simple to use, just send a GET request with the URL encoded page URL in the query string.

    curl -XGET http://localhost:9032?url=http%3A%2F%2Fyourpage.com

The response of this request will contain the pages HTML, but with all the `<script/>` tags removed and replaced with a single `<script/>` tag pointing to the concatenated JavaScript.

For example the following page:

    <html>
    <head>
        <title>Your Page</title>
        <script type="text/javascript" src="/script1.js"></script>
        <script type="text/javascript" src="/script2.js"></script>
        <script type="text/javascript" src="/script3.js"></script>
    </head>
    <body>
        This page contains JavaScript.
    </body>
    </html>

Would be changed to this:

    <html>
    <head>
        <title>Your Page</title>
        <script type="text/javascript" src="http://localhost:9032/script/KpgVGM"></script>
    </head>
    <body>
        This page contains JavaScript.
    </body>
    </html>

Where the URL in the new single `<script/>` tag points to the JavaScript concatenation.

Scrptly is built using [Node.js](http://nodejs.org/), this means that if the requested page uses JavaScript to dynamically produce the `<script/>` tags, say with [Require.js](http://requirejs.org/), then that JavaScript will be run within the Scrptly server to produce all the required `<script/>` tags before they are then concatenated and replaced.


Script Concatenation
--------------------

Scrptly can also be used to manually concatenate a bunch of JavaScript files, this is done by sending either a POST or GET request to the `/cat` context.

Any modules defined within the JavaScript files will be given names if they don't have them already, this is to allow them to coexist in the one file.

### POST
The PUT request must have within it's body some JSON containing the url of the page that the JavaScript file url's were extracted from and the absolute or relative URL's to the JavaScript files.

    curl -XPOST http://localhost:9032/cat -d '{
        "page": 'http://yourpage.com',
        "scripts": [
        "http://yourpage.com/scripts/script1.js",
        "script2.js",
        "/scripts/script3.js"
        ]
    }'

The response to this request will be an HTTP 302 that will redirect the to a generated URL exposing the concatenated JavaScript. The response body will also have some JSON containing the generated URL.

    HTTP/1.1 302 Moved Temporarily
    Location: http://localhost:9032/KpgVGM
    Content-Type: application/json
    {
        "url": "http://localhost:9032/script/KpgVGM"
    }

The generated URL for a fixed set of scripts will always be the same, irrespective of the ordering. So the following script sets will always produce the same URL.

    {
        "scripts": [
            "http://yourpage.com/script1.js",
            "http://yourpage.com/script2.js",
            "http://yourpage.com/script3.js"
        ]
    }

    {
        "scripts": [
            "http://yourpage.com/script2.js",
            "http://yourpage.com/script1.js",
            "http://yourpage.com/script3.js"
        ]
    }

    {
        "scripts": [
            "http://yourpage.com/script1.js",
            "http://yourpage.com/script3.js",
            "http://yourpage.com/script2.js"
        ]
    }

Where as these three sets will all produce different URL's:

    {
        "scripts": [
            "http://yourpage.com/script1.js",
            "http://yourpage.com/script2.js"
        ]
    }

    {
        "scripts": [
            "http://yourpage.com/script1.js",
            "http://yourpage.com/script3.js"
        ]
    }

    {
        "scripts": [
            "http://yourpage.com/script2.js",
            "http://yourpage.com/script3.js"
        ]
    }


It is also possible to provide a static path for the concatenated JavaScript if one is required. Though the related JavaScript will be overwritten if it is called with a different script signature.

    curl -XPOST http://localhost:9032/cat -d '{
        "path": "/yourpage"
        "scripts": [
            "http://yourpage.com/script1.js",
            "http://yourpage.com/script2.js",
            "http://yourpage.com/script3.js"
        ]
    }'

The response will then redirect to a URL containing the requested path:

    HTTP/1.1 302 Moved Temporarily
    Location: http://localhost:9032/yourpage
    Content-Type: application/json
    {
        "url": "http://localhost:9032/script/yourpage"
    }


### GET
Scrptly can also concatenate scripts from a GET request, this is done by including the script URL's in the query string. The concatentation is only ever carried out once for any script signature, again irrespective of order.

    curl -XGET http://localhost:9032/cat?script=http%3A%2F%2Fyourpage.com%2Fscript1.js&script=http%3A%2F%2Fyourpage.com%2Fscript2.js&script=http%3A%2F%2Fyourpage.com%2Fscript3.js

The response to this request will be the concatenated JavaScript.

It is possible however to force a purge and concatenation of the cached JavaScript by added the `refresh` parameter to the query string.

    curl -XGET http://localhost:9032/cat?script=http%3A%2F%2Fyourpage.com%2Fscript1.js&script=http%3A%2F%2Fyourpage.com%2Fscript2.js&script=http%3A%2F%2Fyourpage.com%2Fscript3.js&refresh=true
