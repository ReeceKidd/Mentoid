/*
Checks that a string contains only alphabetical and white space charcters. 
*/
module.exports = function alphaWithSpace(string) {
    var match = string.match(/^[A-Za-z\s]+$/)
    if (match) {
        return true
    }
    return false
}