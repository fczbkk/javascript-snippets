/*
Simple way of converting text to XML document. This comes handy when you
receive XML data via Ajax.
*/

function convertTxtToXml(text, callback) {
    text = text || '';
    callback = callback || function () {};

    var parser = new DOMParser();
    var doc = parser.parseFromString(text, "application/xml");

    callback(doc);
    return doc;    
}

// A simple example:
var txt = '<items><item value="1" /><item value="2" /><item value="3" /></items>';
var data = convertTxtToXml(txt);
var items = data.getElementsByTagName('item');