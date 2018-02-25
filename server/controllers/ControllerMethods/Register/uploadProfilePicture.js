   /*
                  This method is different as it is not actually checking the UserID, it is just used
                  to update the profile picture on the front end which waits for a response. As it is 
                  doing nothing important it does not need to go through the same security checks that the 
                  other methods do. 
                  */

   var User = require('../../../models/user')

   var logger = require('../../../src/logger.js')(module)

   module.exports = uploadProfilePicture = (req, res) => {

       try {
           res.status(200).send('Uploaded profile picture successfully')
           logger.debug('UserID: ' + req.query.userID + ' updated profile picture successfully.')
           var query = {
               '_id': req.query.userID
           }
           User.findOneAndUpdate(query, {
                   $set: {
                       hasProfilePicture: true
                   },
               },
               function (err, user) {
                   if (err) {
                       logger.error(err)
                   } else {
                       logger.info(req.query.userID + ' updated profile picture successfully: ')
                   }
               }
           )
       } catch (exception) {
           logger.error(exception)
           res.status(500).send(exception)
       }

   }