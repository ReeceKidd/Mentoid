module.exports = function updateMentorPreferencesSanitization(body){

    body.userID = escape(body.userID)
    body.userID = body.userID.trim()

    body.areasOfInterestMentoring = escape(body.areasOfInterestMentoring)
    body.areasOfInterestMentoring = body.areasOfInterestMentoring.trim()

    body.prefferedMentoringFormats = escape(body.prefferedMentoringFormats)
    body.prefferedMentoringFormats = body.prefferedMentoringFormats.trim()

    body.maximumTravelDistance = escape(body.maximumTravelDistance)
    body.maximumTravelDistance = body.maximumTravelDistance.trim()

    body.prefferedEducationMentoring = escape(body.prefferedEducationMentoring)
    body.prefferedEducationMentoring = body.prefferedEducationMentoring.trim()

    body.maximumAgeMentoring = escape(body.maximumAgeMentoring)
    body.maximumAgeMentoring = body.maximumAgeMentoring.trim()

    body.minimumAgeMentoring = escape(body.minimumAgeMentoring)
    body.minimumAgeMentoring = body.minimumAgeMentoring.trim()
    
}