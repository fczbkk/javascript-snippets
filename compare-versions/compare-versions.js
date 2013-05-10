/*
Function to compare two version strings (e.g. '1.0.0' or '26.0.1410.64').
Expects two arguments. Returns 'null' object if any of the arguments is wrong.
Returns 0 if versions are the same.
Returns -1 if left version (first argument) is lower.
Returns 1 if left version (first argument) is higher.
*/

function compareVersions(left, right) {
    var result = null;

    // any character except digit or dot | two dots | dot at the beginning | dot at the end
    var re = /[^\d\.]|\.\.|^\.|\.$/;

    // check if both strings exist and if they are valid
    if (left && right && !left.match(re) && !right.match(re)) {
        
        // parse inputs into array of numbers
        function handleInput(n) {
            return n.split('.').map(function (item) {
                return parseInt(item, 10);
            });
        }
        
        left = handleInput(left);
        right = handleInput(right);
        
        result = 0;
        
        var pointer = 0;
        while (!isNaN(left[pointer]) || !isNaN(right[pointer])) {
            var lNum = left[pointer] || 0;
            var rNum = right[pointer] || 0;
            if (lNum > rNum) {result = 1; break;}
            if (lNum < rNum) {result = -1; break;}
            pointer++;
        }
        
    }
    
    return result;
}
