// importing controller, db model and repository

import experienceController from "../experience/controller.js";
import experience from "./db.js"
import experienceRepository from "../experience/repository.js"
import isAuth from '../../util/isAuth.js'

const handleProfileRequest = (app) => {
  
  // pass model in repository for queries
  const repository = experienceRepository( experience );
  // controller to manage routes
  const controller = experienceController({ repository });
  
  app.post('/experience/add', isAuth, controller.addExperience)
  app.get('/experience/get', isAuth, controller.getExperiences)
  app.delete('/experience/delete', isAuth, controller.deleteExperience)
  app.put('/experience/edit', isAuth, controller.editExperience)
  app.put('/experience/toggle', isAuth, controller.toggleBestExperience)

  // error handling middleware
  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
  })

}

export default handleProfileRequest;
