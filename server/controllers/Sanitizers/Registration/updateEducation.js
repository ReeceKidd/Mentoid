module.exports = function updateJobHistorySanitization(body){

    body._id = escape(body._id)
    body._id = body._id.trim()

    body.age = escape(body._id)
    body.age = body.age.trim()

    for(var currentIndex in body.experiences){

        var currentExperience = body.experiences[currentIndex]
        var title = currentExperience.title
        var company = currentExperience.company
        var startDate = currentExperience.startDate
        var endDate = currentExperience.endDate
        var isWorkingHere = currentExperience.isWorkingHere
        var experienceID = currentExperience.experienceID

        title = escape(title)
        title = title.trim()

        company = escape(company)
        company = company.trim()

        startDate = escape(startDate)
        startDate = startDate.trim()

        endDate = escape(endDate)
        endDate = endDate.trim()

        experienceID = escape(experienceID)
        experienceID = experienceID.trim()
    }
    
}