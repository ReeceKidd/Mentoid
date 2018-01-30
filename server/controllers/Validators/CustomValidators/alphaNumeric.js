/*
Checks that a string contains only alphabetical and numeric characters no white space. 
*/
module.exports = function alphaWithSpace(string) {
    var match = string.match(/^[a-z0-9]+$/i)
    if (match) {
        return true
    }
    return false
}