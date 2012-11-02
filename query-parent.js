/*
I use these functions when manipulating the DOM in my browser extensions:
https://chrome.google.com/webstore/detail/ebmgejpgpphipjooiopnndkdiciedkdj

It is useful when you need to work with HTML code that is not very semantic
and you can't use simple CSS selectors to get the right elements.

For example, you need to get all the table rows that contain cells with
a class:

table
  tr    <-- you want to get this...
    th
    td.something
  tr    <-- ...and this...
    th
    td.something
  tr    <-- ...but not this one
    th
    td

Now you can get them by calling queryParentAll() like that:

var rowsWithSomething = queryParentAll(document.body, 'td.something', 'tr');

NOTE: I know that the "rootNode" attribute seems unnecessary. But since I use
it in documents that are frequently modified by ajax requests, it is really
helpful to be able to limit the scope of the search. Trust me. Go and read
about the Mutation Observers, if you don't believe me:
https://developer.mozilla.org/en-US/docs/DOM/MutationObserver

*/

function queryParentAll(rootNode, elementSelector, parentSelector, callback) {
    
    var result = [];

    // default values for options
    rootNode        = rootNode        || document.body;
    elementSelector = elementSelector || '*';
    parentSelector  = parentSelector  || '*';
    callback        = callback        || function () {};
    
    // helper function that determines if an element is present in a live
    // collection
    function isInCollection(element, collection) {
        for (var i = 0, j = collection.length; i < j; i++) {
            if (collection[i] == element) {return true;}
        }
        return false;
    }
    
    // iterate through all elements found by element selector
    var elements = rootNode.querySelectorAll(elementSelector);
    for (var i = 0, j = elements.length; i < j; i++) {
        
        // start checking at element's parent, then walk through all the
        // parents to the top-level node
        
        // stop if there are no more parent elements or if the parent element
        // doesn't support queries (e.g. HEAD)
        
        // skip elements that are already in the results array to prevent
        // duplicates

        var element = elements[i].parentNode;
        while (
            element                                 // element exists
            && element.parentNode                   // parent exists and...
            && element.parentNode.querySelectorAll  // ...is normal element
            && (result.indexOf(element) == -1)      // prevent duplicates
        ) {
            
            // check if any of the elements fit the parent selector
            // if they do, add them to the results array
            var selectedChildren = element.parentNode.querySelectorAll(parentSelector);
            if (isInCollection(element, selectedChildren)) {
                result.push(element);
            }
            
            element = element.parentNode;
            
        }
    }
    
    callback(result);
    return result;
    
}

// this is just a handy shortcut for getting the closest parent 
function queryParent(rootNode, elementSelector, parentSelector, callback) {
    var result = queryParentAll(rootNode, elementSelector, parentSelector);
    callback(result[0]);
    return result[0];
}
