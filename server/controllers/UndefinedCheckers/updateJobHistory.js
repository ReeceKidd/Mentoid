module.exports = function undefinedJobHistory(req){
    
    if(req.experiences === undefined){
        return 'Experiences Array must be defined'
    }

    if(req._id === undefined) {
        return 'ID must be defined.'
    }

    if(req.age === undefined) {
        return 'Age must be defined.'
    }
}