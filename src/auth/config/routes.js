import userController from "../user/controller.js";
import user from "./db.js";
import userRepository from "../user/repository.js";
import argon2 from 'argon2';
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN; 
import TwilioClient from 'twilio'
const client = TwilioClient(accountSid, authToken);
import validate from "../util/validate.js";
import validationHandler from "../util/validationHandler.js";
import isAuth from '../../util/isAuth.js'

const handleUserRequest = (app) => {
  
  // const user = userSchema;
  const repository = userRepository( user );
  
  const controller = userController({ repository, argon2, client });
  // app.post('/user/create', validate('user'), validationHandler, controller.signupUser)
  
  app.post('/user/create', validate('user'), validationHandler, controller.signupUser)
  app.post('/user/login', controller.loginUser)
  app.get('/user/me', controller.getInfo)
  app.post('/user/resetPassword', isAuth, controller.resetPassword)
  app.post('/user/sendOtp', controller.sendOtp)
  app.post('/user/verifyOtp', controller.verifyOtp)
  app.post('/user/oAuth', controller.oAuthUser)
  app.post('/user/check', isAuth, controller.checkUser)
  app.put('/user/update', isAuth, controller.updateUser)
  app.post('/profile/create', isAuth, controller.createProfile)

  // // app.post('/student/create', validate('student'), validationHandler, controller.createStudent)

  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ error_message: message, data: data })
  })

}

export default handleUserRequest;
