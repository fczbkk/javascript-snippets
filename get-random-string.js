/*
Generates a random string and returns them or sends it to callback.
Great for generating unique identifiers.

Has two optional parameters:
- length - 8 characters by default
- characters - upper- and lowercase characters and numbers by default
*/

function getRandomString(options, callback) {
    options = options || {};
    options.length = options.length || 8;
    options.characters = options.characters || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    
    callback = callback || function () {};

    var result = '';
    while (options.length--) {
        result += options.characters.charAt(
            Math.floor(Math.random() * options.characters.length)
        );
    }
    
    callback(result);
    return result;
}

// default use, e.g. "2a2giHof"
getRandomString();

// set length, e.g. "xBh"
getRandomString({
    length : 3
});

// set length and list of characters to use, e.g. "BAB"
getRandomString({
    length : 3,
    characters : 'ABC'
});