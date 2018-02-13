const axios = require('axios')
const updateAreasOfInterestURL = 'http://localhost:4000/update/areas-of-interest/'
const getHobbiesArray = require('./getHobbiesArray.js')


module.exports = function updateAreasOfInterest(userID) {

}

function getValue() {

    var hobbiesArray = getHobbiesArray()
    var randomValue = hobbiesArray[Math.floor(Math.random() * hobbiesArray.length)]
    return randomValue

}

console.log(getValue());


function getNumberOfLikes() {

}

function getNumberOfLinksClicked() {

}

function getArticlesRead() {

}

function getVideosWatched() {

}

function getPathsStudied() {

}