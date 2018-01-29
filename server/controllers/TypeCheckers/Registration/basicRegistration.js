module.exports = function basicRegistration(req){
        var values = Object.values(req)
        console.log(values)
        for(var index in values){
            if(!values[index] instanceof String){
                return values[index] + ' must be a string'
            }
        }
    
}