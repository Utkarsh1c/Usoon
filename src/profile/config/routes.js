// importing controller, db model and repository
import isAuth from '../../util/isAuth.js'

import profileController from "../profile/controller.js";
import profile from "./db.js"
import profileRepository from "../profile/repository.js"

const handleProfileRequest = (app) => {
  
  const repository = profileRepository( profile );
  const controller = profileController({ repository });
  
  // app.post('/profile/create', isAuth, controller.createProfile)
  app.get('/profile/get', isAuth, controller.getProfile)
  app.put('/profile/update', isAuth, controller.updateProfile)

  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
  })

}

export default handleProfileRequest;

