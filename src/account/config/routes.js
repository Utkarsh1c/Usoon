// importing controller, db model and repository

import accountController from "../account/controller.js";
import account from "./db.js"
import accountRepository from "../account/repository.js"
import userRepository from "../../auth/user/repository.js"
import profileRepository from "../../profile/profile/repository.js"
import user from "../../auth/config/db.js"
import profile from "../../profile/config/db.js"
import isAuth from '../../util/isAuth.js'

const handleLibraryRequest = (app) => {
  
  // pass model in repository for queries
  const repository = accountRepository( account );
  const repository1 = userRepository( user );
  const repository2 = profileRepository( profile );
  
  // controller to manage routes
  const controller = accountController({ repository, repository1, repository2 });
  
  app.put('/account/edit', isAuth, controller.editAccount)
  app.get('/account/get', isAuth, controller.getAccount)

  // error handling middleware
  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
  })

}

export default handleLibraryRequest;
