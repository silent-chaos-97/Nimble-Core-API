const app = require('../../../core')
const service = app.services.auth
//
// async function send_verify_code(req, res) {
//   try {
//     const { id } = req.body
//     await service.sendVerifyCode(id).then(() => {
//       // console.log('res in send verify code', res)
//     })
//   } catch (error) {
//     // console.log('error in send verify controller', error)
//     res.status(500).json({ message: 'Something went wrong' })
//   }
