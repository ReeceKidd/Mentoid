const axios = require('axios')
const updateJobHistoryURL = 'http://localhost:4000/update/job-history'
var experienceID = 0
const date = new Date()
const currentYear = date.getFullYear()
var arrayOfJobs = require('./listOfJobs.js')
var arrayOfCompanies = require('./listOfCompanies.js')
var experiences = []

module.exports = function updateEducation(userName, userID, age) {
    var numberOfJobs = getNumberOfJobs(age)
    for (var index = 0; index < numberOfJobs; index++) {
        var title = getTitle()
        var company = getCompany()
        var startYear = getStartYear(age)
        var isWorkingHere = getIsWorkingHere()
        if (isWorkingHere === 'No') {
            var endYear = getEndYear(startYear)
            experiences.push({
                title: title,
                company: company,
                startYear: startYear,
                endYear: endYear,
                isWorkingHere: isWorkingHere,
                experienceID: experienceID
            })
        } else {
            experiences.push({
                title: title,
                company: company,
                startYear: startYear,
                isWorkingHere: isWorkingHere,
                experienceID: experienceID,
                endYear: 9999
            })
            experienceID++
        }
    }

    await axios.post(updateJobHistoryURL, {
        _id: userID,
        age: age,
        experiences: experiences
    }).then(jobHistory => {
        console.log(userName + ' updated job history')
    }).catch(error => {
        console.log('Could not update job history: ' + error.message)
    })

    return experiences
}

function getNumberOfJobs(age) {

    if (age > 50) {
        return Math.floor(Math.random() * 5) + 2
    } else {
        return Math.floor(Math.random() * 3) + 1
    }

}

function getTitle() {
    var job = arrayOfJobs[Math.floor(Math.random() * arrayOfJobs.length)]
    job = job.replace("\\", "")
    return job
}

function getCompany() {
    return arrayOfCompanies[Math.floor(Math.random() * arrayOfCompanies.length)]
}

function getIsWorkingHere() {

    for (var x = 0; x < experiences.length; x++) {
        if (experiences[x].isWorkingHere === 'Yes') {
            return 'No'
        }
    }
    return 'Yes'
}

function getStartYear(age) {
    return (currentYear - (Math.floor(Math.random() * (age - 16)) + 0)).toString()
}

function getEndYear(startYear) {
    var startYear = parseInt(startYear)
    var possibleYears = currentYear - startYear
    return (currentYear - (Math.floor(Math.random() * possibleYears) + 0)).toString()
}