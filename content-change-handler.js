/*
This object periodicaly checks for changes in an element. If there is a change,
it executes the callback function.

I started to use this pattern when I was working on an addon for Amazon
(http://amazon-currency-switch.com/) and I needed to modify the content of the
page. When I did the changes when page loaded, I missed all the content that
was loaded later via ajax. So I tried to react to every change in the DOM, but
site like Amazon does approximately 260 changes within a few seconds after the
the load and then some when you scroll down. Finally I started to check for
changes periodicaly, every few seconds, firing the callback only when there were
actual changes. And that worked like a charm.
*/

function ContentChangeHandler (options, callback) {
    
    // If no callback is provided, an empty function will be used. This doesn't
    // really make sense, but I guess you could setup the object and add or
    // modify the callback later.
    this.callback = (typeof callback == 'function') ? callback : function () {};
    
    // Options object can provide the element that you want to observe and the
    // frequency of checks. If not provided, it uses document.body (whole
    // document) and 5-second interval as default.
    // NOTE: If you will init the object before the document is loaded,
    // the document.body object will be null. So be careful with that.
    this.element = (options && options.element) ? options.element : document.body;
    this.frequency = (options && options.frequency) ? options.frequency : 1000*5;

    // Just some placeholders for later use.
    this.originalSize = 0;
    this.ticker = null;

    // This checks for the lenngth of the element content. If there is any
    // change, callback is fired. 
    this.tick = function () {
        var newSize = this.element.innerHTML.length;
        if (newSize != this.originalSize) {
            this.callback();
            this.originalSize = newSize;
        }
    }
    
    // Stop the interval, in case you need it. This makes sense when you know
    // that tere will not be any changes after some period of time, so you can
    // turn it off for performance reasons.
    this.stop = function () {
        if (this.ticker) {
            clearInterval(this.ticker);
        }
    }
    
    // Start the whole thing. It fires the callback immediately and sets-up the
    // periodic check.
    this.start = function () {
        if (!this.ticker) {
            this.ticker = setInterval(this.tick.bind(this), this.frequency);
        }
        this.callback();    
    }
    
    this.start();    
    return this;
}

// Here's how you use it:

window.addEventListener('load', function () {
    
    // Be sure to initialize after document is loaded, when you use
    // document.body as a watched element.
    var myListener = new ContentChangeHandler(null, function () {
        console.log('Document content has changed.');
    });

    // Custom options example. This will only watch element #myElement every
    // 10 seconds.
    var myOtherListener = new ContentChangeHandler(
        {
            element : document.getElementById('myElement'),
            frequency : 1000 * 10
        },
        function () {
            console.log('My element has changes. Yeah!');
        }
    );

});