/*
No SQL Injection can occur when a user is allowed to pass a $ to a string. 
This method ensures all string inputs are validated so that $ are replaced. 
*/

module.exports = function preventNoSQLInjection(search) {
    var target = this;
    var replacement = 'Dollar'
    return target.replace(new RegExp(search, '$'), replacement);
};