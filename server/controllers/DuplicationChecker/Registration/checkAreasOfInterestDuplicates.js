module.exports = function checkForAreasOfInterestDuplicates(areasOfInterest) {

    var valuesArray = areasOfInterest.map(function(areaOfInterest){ return areaOfInterest.value });
    var isDuplicate = valuesArray.some(function(areaOfInterest, idx){ 
        return valuesArray.indexOf(areaOfInterest) != idx 
    });
    
    if(isDuplicate) {
        return 'Duplicate area of interest found'
    }
}