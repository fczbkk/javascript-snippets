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
