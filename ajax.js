/*
Minimalist AJAX function for the most basic calls. Only supports GET method.
Loads given url and sends result to the callback function.
*/

function ajax (url, callback) {
    callback = callback || function ();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}