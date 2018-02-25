const axios = require('axios')
const updateAreasOfInterestURL = 'http://localhost:4000/generate/areas-of-interest/'
const getHobbiesArray = require('./getHobbiesArray.js')
var areaOfInterestID = 0


module.exports = async function updateAreasOfInterest(userID, age) {

    var areasOfInterest = []
    var numberOfInterestsToCreate = getNumbersOfInterests()
    for (var index = 0; index < numberOfInterestsToCreate; index++) {

        var areasOfInterestValue = getValue()
        for (var y = 0; y < areasOfInterest.length; y++) {
            while (areasOfInterest[y].value === areasOfInterestValue) {
                areasOfInterestValue = getValue()
            }
        }
        areasOfInterest.push({
            value: getValue(),
            years: getYears(age),
            areaOfInterestID: areaOfInterestID,
            pathsStudied: getPathsStudied(),
            videosWatched: getVideosWatched(),
            articlesRead: getArticlesRead(),
            numberOfLinksClicked: getNumberOfLinksClicked(),
            numberOfLikes: getNumberOfLikes()
        })
        areaOfInterestID++
    }

    await axios.post(updateAreasOfInterestURL, {
        _id: userID,
        age: age,
        areasOfInterest: areasOfInterest
    }).catch(error => {
        console.log('Could not complete areas of interest registration: ' + error.message)
    })

    return areasOfInterest

}

function getNumbersOfInterests() {
    return Math.floor(Math.random() * 10) + 1
}

function getValue() {
    var hobbiesArray = getHobbiesArray()
    var randomValue = hobbiesArray[Math.floor(Math.random() * hobbiesArray.length)]
    return randomValue
}

function getYears(age) {
    return Math.floor(Math.random() * (age - 16)) + 0
}
function getNumberOfLikes() {
    return Math.floor(Math.random() * 1000) + 1
}

function getNumberOfLinksClicked() {
    return Math.floor(Math.random() * 10000) + 1
}

function getArticlesRead() {
    return Math.floor(Math.random() * 250) + 1
}

function getVideosWatched() {
    return Math.floor(Math.random() * 250) + 1
}

function getPathsStudied() {
    return Math.floor(Math.random() * 50) + 1
}