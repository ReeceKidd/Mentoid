const axios = require('axios')
const updateEducationURL = 'http://localhost:4000/update/education'
var educationID = 0
var arrayOfUniversities = require('./listOfUniversities.js')
var arrayOfSubjects = require('./listOfSubjects.js')
const date = new Date()
const currentYear = date.getFullYear()

module.exports = async function updateEducation(userID, age) {

    var education = []
    var numberOfEducationExperiencesToCreate = getNumbersOfEducationExperiences()
    for (var index = 0; index < numberOfEducationExperiencesToCreate; index++) {
        var degree = getDegree(index)
        var schoolAndCountry = getSchoolAndCountry()
        var school = schoolAndCountry.name
        var country = schoolAndCountry.country
        var fieldOfStudy = getFieldOfStudy()
        var startYear = getStartYear(age)
        var endYear = getEndYear(startYear, degree)
        education.push({
            degree: degree,
            school: school,
            country: country,
            fieldOfStudy: fieldOfStudy,
            startYear: startYear,
            endYear: endYear,
            educationID: educationID,
        })
        educationID++
    }
  
    await axios.post(updateEducationURL, {
        _id: userID,
        age: age,
        education: education
    }).catch(error => {
        console.log('Could not update education: ' + error.message)
    })

    return education

}

function getNumbersOfEducationExperiences() {
    
    /*
    This method is trying to simiulate the amount of education acheived making it more realistic,
    my including a much smaller percentage that acheive Masters and PHD. 
    */

    var percentile = Math.floor(Math.random() * 100) + 1

    if(percentile < 50){
        return 1
    }

    else if(percentile >= 50 && percentile < 70){
        return 2
    }

    else if(percentile >= 70 && percentile <=90){
        return 3
    }

    else if(percentile > 90 && percentile < 95 ){
        return 4
    }

    else return 5
}

function getDegree(index) {
    
    var majorityOptions = ['Vocational', 'Bachelors', 'Certification']
    var lesserOptions = ['Bachelors', 'Masters', 'Certification']
    var rareOptions = ['Masters', 'PHD']

    if(index === 0){
        return majorityOptions[Math.floor(Math.random() * majorityOptions.length)]
    }

    if(index === 1){
        return majorityOptions[Math.floor(Math.random() * majorityOptions.length)] 
    }

    if(index === 2){
        return lesserOptions[Math.floor(Math.random() * lesserOptions.length)]
    }
    
    if(index === 3){
        return lesserOptions[Math.floor(Math.random() * lesserOptions.length)]
    }

    if(index === 4){
        return rareOptions[Math.floor(Math.random()* rareOptions.length)]
    }
}

function getFieldOfStudy() {
    return arrayOfSubjects[Math.floor(Math.random() * arrayOfSubjects.length)];
}

function getSchoolAndCountry() {
    var randomUniversity = arrayOfUniversities[Math.floor(Math.random() * arrayOfUniversities.length)];
    return {
        name: randomUniversity.name,
        country: randomUniversity.country
    }
}

function getStartYear(age) {
    if(age > 50){
        return parseInt(currentYear - ((Math.floor(Math.random() * (age/2)) + 1)))
    } else {
        return parseInt(currentYear - ((Math.floor(Math.random() * (age/3)) + 1)))
    }
}

function getEndYear(startYear, degree) {
    
    if(degree === 'Vocational'){
        var randomNumberOfYears = Math.floor(Math.random() * 3) + 0
        return startYear + (Math.floor(Math.random() * 3) + 0)
    }
    if(degree === 'Certification'){
        var randomNumberOfYears = Math.floor(Math.random() * 2) + 0 
        return startYear + randomNumberOfYears
    }
    if(degree === 'Bachelors'){
        console.log
        var randomNumberOfYears = Math.floor(Math.random() * 4) + 3
        return startYear + randomNumberOfYears
    }
    if(degree === 'Masters'){
        var randomNumberOfYears = Math.floor(Math.random() * 3) + 1
        return startYear + randomNumberOfYears
    }
    if(degree === 'PHD'){
        var randomNumberOfYears = Math.floor(Math.random() * 7) + 3
        return startYear +randomNumberOfYears
    }
}