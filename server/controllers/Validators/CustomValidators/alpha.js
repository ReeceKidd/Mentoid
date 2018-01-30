/*
Checks that a string contains only alphabetical characters no white space. 
*/
module.exports = function alphaWithSpace(string) {
    var match = string.match(/^[A-Za-z]+$/)
    if (match) {
        return true
    }
    return false
}