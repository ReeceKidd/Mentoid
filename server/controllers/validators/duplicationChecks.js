// Checks that there is no repeat "value" in any of the areas of interest objects. 

const duplicateChecker = {}

duplicateChecker.checkForDuplicates = function checkForDuplicates(areasOfInterest) {
    var valuesArray = areasOfInterest.map(function(areaOfInterest){ return areaOfInterest.name });
    var isDuplicate = valuesArray.some(function(areaOfInterest, idx){ 
        return valuesArray.indexOf(areaOfInterest) != idx 
    });
    
    return isDuplicate
}
    
module.exports = duplicateChecker