module.exports = function checkForNulls(requestBody){

    var objectProperties = Object.getOwnPropertyNames(requestBody)
    var objectValues = Object.values(requestBody)

    for(var x = 0; x < objectValues.length; x++){
        if(objectValues[x] === null){
            return objectProperties[x] + ' cannot contain a null value'
        }
    }

}