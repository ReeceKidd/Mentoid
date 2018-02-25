const axios = require('axios')
const basicRegistrationURL = 'http://localhost:4000/register/'

const firstNamesArray = require('./firstNames.js')
const lastNamesArray = require('./lastNames.js')

let firstName = getFirstName()
let lastName = getLastName()
let userName = getUserName()
let email = getEmail()
let age = getAge()
let password = getPassword()
let confirmPassword = password
let language = getLanguage()
let terms = getTerms()

/* Register Basic User */
module.exports = function registerBasicUser() {
    axios.post(basicRegistrationURL, {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        age: age,
        password: password,
        confirmPassword: confirmPassword,
        language: language,
        terms: terms
    }).then(basicRegistrationComplete => {
        console.log(userName + ' basic registration complete. ')
    }).catch(error => {
      console.log('Could not complete basic registration: ' + error)
    })
    return userName
}


function getFirstName() {
    return firstNamesArray[Math.floor(Math.random() * firstNamesArray.length)]
}

function getLastName() {
    return lastNamesArray[Math.floor(Math.random() * lastNamesArray.length)]
}

function getUserName() {
    return firstName + lastName + Math.floor(Math.random() * 10) + 1
}

function getEmail() {
    return userName + '@gmail.com'
}

function getAge() {
    return (Math.floor(Math.random() * 100) + 16).toString()
}

function getPassword() {
    return 'password'
}

//This simulates that the majority of users will be English speakers. 
function getLanguage() {

    var probability = Math.floor(Math.random() * 100) + 70
    if (probability < 80) {
        return 'Spanish'
    } else return 'English'

}

function getTerms() {
    return 'true'
}