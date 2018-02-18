   /*
   This method is different as it is not actually checking the UserID, it is just used
   to update the profile picture on the front end which waits for a response. As it is 
   doing nothing important it does not need to go through the same security checks that the 
   other methods do. 
   */

   var User = require('../../../models/user')

   module.exports = uploadProfilePicture = (req, res) => {

       try {
           res.status(200).send('Uploaded profile picture successfully')
       } catch (exception) {
           res.status(500).send(exception)
       }

   }