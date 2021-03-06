const axios = require('axios')
const updateMentorSettingsURL = 'http://localhost:4000/update/mentor-settings/'

/*
Do need to modulate this code as there is duplication between Mentee preferences and mentor preferences. 
*/

module.exports = async function updateAreasOfInterest(userName, userID, age, areasOfInterest) {
    /*
    Array is sorted by years of experience before the random amount is selected to ensure that Mentors choose the areas of 
    interest that they have the most experience in. Then a random number of the higher years of experience are choosen. 
    */
    sortByYearsOfExperience(areasOfInterest)
    var wouldLikeToMentor = true
    var areasOfInterest = getAreasOfInterest(areasOfInterest)
    var prefferedMentoringFormats = getPrefferedMentoringFormats()
    var maximumTravelDistance = getMaximumTravelDistance()
    var mentoringLanguages = getMentoringLanguages()
    var prefferedEducation = getPrefferedEducation()
    var minimumAge = getMinimumAge()
    var maximumAge = getMaximumAge(minimumAge)
    var maxNumberOfMentees = getMaxNumberOfMentees()

    var mentorSettings= {
        wouldLikeToMentor: wouldLikeToMentor,
        areasOfInterest: areasOfInterest,
        prefferedMentoringFormats: prefferedMentoringFormats,
        maximumTravelDistanceKM: maximumTravelDistance,
        languages: mentoringLanguages,
        prefferedEducation: prefferedEducation,
        minimumAge: minimumAge,
        maximumAge: maximumAge,
        maxNumberOfMentees: maxNumberOfMentees
    }

    await axios.post(updateMentorSettingsURL, {
        mentorSettings: mentorSettings,
        userID: userID,
        userName: userName
    }).then(response => {
        console.log(response.data.message)
    }).catch(error => {
        console.log(userName + ' could not update mentor settings: ' + error.message)
    })

    return mentorSettings

}

function getAreasOfInterest(areasOfInterest) {
    var randomNumberOfInterests = Math.floor(Math.random() * areasOfInterest.length) + 1
    var mentoringAreasOfInterest = areasOfInterest.slice(0, randomNumberOfInterests);
    return mentoringAreasOfInterest
}

/*
This method sorts from most years of expereince to least. For Mentee preferences it will be the opposite. 
*/
function sortByYearsOfExperience(areasOfInterest) {
    areasOfInterest.sort(function (a, b) {
        return b.years - a.years;
    });
}

function getPrefferedMentoringFormats() {
    var mentoringFormatsOptions = ['Online', 'In person']
    var mentoringFormats = []
    var randomChoice = Math.floor(Math.random() * 2) + 0
    if (randomChoice === 0) {
        mentoringFormats.push('Online')
    } else if (randomChoice === 1) {
        mentoringFormats.push('In person')
    } else {
        mentoringFormats = mentoringFormatsOptions
    }
    return mentoringFormats
}

function getMaximumTravelDistance() {
    return Math.floor(Math.random() * 100) + 1
}

function getMentoringLanguages() {
    var languageOptions = ['English', 'Spanish', 'German']
    var mentoringLanguages = []
    //Pick a random percentile of the population that can speak multiple languages. 
    var percentile = Math.floor(Math.random() * 100) + 1
    if (percentile < 70) {
        mentoringLanguages.push('English')
    } else if (percentile >= 65 && percentile < 90) {
        if (percentile < 75) {
            mentoringLanguages.push('English')
            mentoringLanguages.push('Spanish')
        } else if(percentile >= 75 && percentile < 85) {
            mentoringLanguages.push('English')
            mentoringLanguages.push('German')
        } else {
            var randomLanguageIndex = Math.random()
            if(randomLanguageIndex < 0.5) {
                mentoringLanguages.push('Spanish')
            } else {
                mentoringLanguages.push('German')
            }
        }
    } else {
        mentoringLanguages = languageOptions
    }
    return mentoringLanguages
}

/*
This method is used so the education preferences are not always the same. 
https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
*/
function shuffleArray(arrayToShuffle) {
    var j, x, i;
    for (i = arrayToShuffle.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arrayToShuffle[i];
        arrayToShuffle[i] = arrayToShuffle[j];
        arrayToShuffle[j] = x;
    }
}

function getPrefferedEducation() {
    var educationOptions = ['No education', 'High School', 'Certification', 'Vocational', 'Bachelors', 'Masters', 'PHD']
    shuffleArray(educationOptions)
    var randomNumberOfEducationPreferences = Math.floor(Math.random() * educationOptions.length) + 1
    var mentoringEducationPreferences = educationOptions.slice(0, randomNumberOfEducationPreferences);
    return mentoringEducationPreferences
}

function getMinimumAge() {
    return Math.floor(Math.random()*(21-16+1)+16);
}

function getMaximumAge(minimumAge) {
    return Math.floor(Math.random()*(100-minimumAge+1)+minimumAge);
}

function getMaxNumberOfMentees() {
    return Math.floor(Math.random()*(10)+1)
}