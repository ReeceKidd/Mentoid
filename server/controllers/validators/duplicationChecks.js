//Checks that critical values aren't duplicated in requests. 

const duplicatedValuesChecker = {}

const areasOfInterest = [{
    "years": 2,
    "value": "Hockey",
    "id": 1
},
{
    "years": 2,
    "value": "Hockey",
    "id": 2
}]

// Checks that there is no repeat "value" in any of the areas of interest objects. 
    
    var valueArr = areasOfInterest.map(function(item){ return item.name });
    var isDuplicate = valueArr.some(function(item, idx){ 
        return valueArr.indexOf(item) != idx 
    });  

console.log(isDuplicate)

module.exports = duplicatedValuesChecker