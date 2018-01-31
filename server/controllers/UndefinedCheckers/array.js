const parameterChecker = require('../../ParameterChecker/checkParameterType')

/*
This method checks that required fields are present inside of requests for non array values. 

--Parameters--

requestObject: This is the array being requested.
fieldsThatShouldBeDefined: Pass the strings values of the properties that should be included. 
*/

module.exports = function undefinedFields(requestArray, expectedProperties) {

    parameterChecker.checkForObject(requestArray)
    parameterChecker.checkForArray(expectedProperties)

    for (index in requestArray) {

        objectProperties = Object.getOwnPropertyNames(requestArray[index]);

        for (var x = 0; x < expectedProperties.length; x++) {
            if (objectProperties.indexOf(expectedProperties[x]) === -1) {
                return expectedProperties[x] + ' was not found in request'
            }
        }
    }

}