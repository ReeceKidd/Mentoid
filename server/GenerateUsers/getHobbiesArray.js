const getStringOfHobbies = require('./stringOfHobbies.js')
/*
This method parses the string from the Wikipedia page. 
*/

module.exports = function getHobbiesArray() {

  var stringToParse = getStringOfHobbies()

  var matches = stringToParse.match(/\*\ \[\[(.*?)\]\]/g);
  var matchesWithoutSpecialCharacters = []

 matches.forEach(function (match) {
   //Original Strings: '* [[ Value ]] 
    match = match.replace(/\*\ \[\[/g, '')
    //New String: Value ]]
    match = match.replace(/\]\]/g, '')
    //New String: Value

    /*
    In some cases '|' is used for similar hobbies this splits when a '|' is found.
    */

    var twoWordsFound = match.match(/\|/g)
    
    if(twoWordsFound){
      
      var splitByBarCharacter = match.split('|')
      matchesWithoutSpecialCharacters.push(splitByBarCharacter[0])
      matchesWithoutSpecialCharacters.push(splitByBarCharacter[1])
   
    } else 
    matchesWithoutSpecialCharacters.push(match)
  })

  return matchesWithoutSpecialCharacters
  
}