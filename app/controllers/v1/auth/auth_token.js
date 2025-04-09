// const bcrypt = require('bcrypt')
// const crypto = require('crypto')
// const moment = require('moment/moment')
// const app = require('../../../core')
//
// const UserModel = app.models.user
// const usersService = app.services.user
// const tokenService = app.services.token
// const oneTimeTokenService = app.services.applicantOneTimeToken
// const { mfaVerify } = app.plugins
//

// async function verifyCode(res,id){
//   const sentSuccess = await mfaVerify.sendVerificationCode(id)
//
//   if (!sentSuccess){
//     return res.status(500).json({ message: 'Something went wrong', status:false })
//   }
//
//   if (sentSuccess){
//     const saltRounds = 10
//     const unHashedVerificationToken = crypto.randomBytes(10).toString('hex')
//     let saltData = ""
//
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//       if (err){
//         return res.status(500).json({msg: err})
//       }
//
//       saltData = salt
//
//       bcrypt.hash(unHashedVerificationToken, salt, function(err, hash) {
//         if (err){
//           return res.status(500).json({msg: err})
//         }
//
//         // Store hashed one-time-token to DB.
//         const oneTimeTokenData = {
//           phone: id,
//           hashedVerificationToken: hash,
//           expiration: moment().add(60, 'minutes').unix()
//         }
//
//         oneTimeTokenService.create(oneTimeTokenData)
//
//         return res.status(200).json({id: id, verification_token: unHashedVerificationToken})
//       })
//     })
//   }
