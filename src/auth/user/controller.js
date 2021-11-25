import signup from './use_cases/signup.js';
import login from './use_cases/login.js';
import otp from './use_cases/otp.js'
import oAuth from './use_cases/oAuth.js'
import check from './use_cases/check.js'
import edit from './use_cases/edit.js'
import makeUser from './user.js';
import generateJWT from '../util/generateToken.js'
import jwt from 'jsonwebtoken'
import create_prof from './use_cases/create_prof.js'

export default ({ repository, argon2, client }) => {

  const signupUser = (req, res, next) => {
    console.log(req.body);
    const addUserCase = signup({ repository, argon2, makeUser, generateJWT });
    const { username, email, password } = req.body;
    addUserCase.execute( username, email, password )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  const loginUser = (req, res, next) => {
    console.log(req.body);
    const logUserCase = login({ repository, argon2, generateJWT });
    const { username, password } = req.body;
    logUserCase.execute( username, password )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  const getInfo = async (req, res, next) => {
    const authHeader = req.get('Authorization');
      if (!authHeader) {
          const error = new Error('Not authenticated.');
          error.statusCode = 401;
          throw error;
      }
      
      //deriving token from bearer token
      const token = authHeader.split(' ')[1];
  
      let decodedToken;
      //verifying integrity of token
      try {
          decodedToken = jwt.verify(token, 'supersecret');
      } 
      catch (err) {
          err = new Error('Not authenticated.');
          err.statusCode = 401;
          throw err;
      }
      
      const userId = decodedToken.data.id;
      const currUser = await repository.getById(userId);
      const result = {
        user: {
          id: currUser.id,
          email: currUser.email,
          username: currUser.username
        }
      }
      res.json(result); 
  }

  const resetPassword = async (req, res, next) => {
    // res.json({a : b})
    const { email, password, confirm_password } = req.body;
    if (password !== confirm_password)
      throw new Error('Password confirmation does not match password');
    
    const userRecord = await repository.getByEmail(email);
    const passwordHashed = await argon2.hash(password);
    const data = { password: passwordHashed };
    try {
      const loggedUser = await repository.instanceUpdate(userRecord, data);
      res.json({
        id: loggedUser.id,
        email: loggedUser.email,
        username: loggedUser.username
      }) 
    } 
    catch (err) {
      next(err);
    }
  }


  const sendOtp = async (req, res, next) => {
    const { email, username, check_user } = req.body;
    const sendOtpCase = otp({ repository, client });
    sendOtpCase.execute( email, username, check_user )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  const verifyOtp = (req, res, next) => {
    client
      .verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks
      .create({
        to: req.body.email,
        code: req.body.code
      })
      .then((data => {
        console.log(data);
        if(data.status === 'approved')
          res.json(data);
        else {
          const error = new Error('Failed to verify otp');
          error.statusCode = 400;
          throw error;
        }
      }))
      .catch(err => {
        console.log(err);
        next(err);
      })
  }

    const oAuthUser = (req, res, next) => {
      const oAuthUserCase = oAuth({ repository, makeUser, generateJWT });
      const { email, method } = req.body;
      oAuthUserCase.execute( email, method )
        .then(
          result => { res.json(result) },
          err => { next(err) }
        );
    }

    const handleImageUpload = (req, res, next) => {
        const singleUpload = upload.single('file');
        singleUpload(req, res, function (err) {
            if (err) {
              // return res.json({
              //   success: false,
              //   error_message: "Image Upload Error",
              //   errors: {
              //     title: "Image Upload Error",
              //     detail: err.message,
              //     error: err,
              //   },
                
              // });
              const error = new Error('Image Upload Error');
              next(error);
            }
            const image_url = req.file.location;
            res.json({
                image_url : image_url
            });
        })
    }

    const createProfile = (req, res, next) => {
      const createProfileCase = create_prof({ repository, makeUser });
      const userId = req.userId;
      const { name, phone, country, city, state, languages, home_latitude, home_longitude, friends_see_selfies, friends_see_tagged_photos, current_latitude, current_longitude } = req.body;
      var image_url = req.body.image_url;
      var bio = req.body.bio;
      if (image_url == undefined || image_url == '')
        image_url = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc=';
      if (bio == undefined || bio == '')
        bio = 'Hey there! I am using Usoon' 
      createProfileCase.execute( userId, image_url, name, phone, country, city, state, languages, home_latitude, home_longitude, bio, friends_see_selfies, friends_see_tagged_photos, current_latitude, current_longitude )
        .then(
          result => { res.json(result) },
          err => { next(err) }
        );
    }

    const checkUser = (req, res, next) => {
      const checkUserCase = check({ repository });
      const { username } = req.body;
      const currUsername = req.username;
      checkUserCase.execute( username, currUsername )
        .then(
          result => { res.json(result) },
          err => { next(err) }
        );
    }

    const updateUser = (req, res, next) => {
      const updateUserCase = edit({ repository });
      const { username, email } = req.body;
      const userId = req.userId;
      updateUserCase.execute( userId, username, email )
        .then(
          result => { res.json(result) },
          err => { next(err) }
        );
    }

  return Object.freeze({
    signupUser,
    loginUser,
    getInfo,
    sendOtp,
    verifyOtp,
    resetPassword,
    oAuthUser,
    handleImageUpload,
    checkUser,
    createProfile,
    updateUser
  })
}