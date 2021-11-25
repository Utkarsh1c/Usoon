// importing controller, db model and repository

import libraryController from "../library/controller.js";
import library from "./db.js"
import libraryRepository from "../library/repository.js"
import isAuth from '../../util/isAuth.js'

const handleLibraryRequest = (app) => {
  
  // pass model in repository for queries
  const repository = libraryRepository( library );
  // controller to manage routes
  const controller = libraryController({ repository });
  
  app.post('/library/add', isAuth, controller.addBook)
  app.get('/library/get', isAuth, controller.getBooks)
  app.delete('/library/delete', isAuth, controller.deleteBook)
  app.put('/library/edit', isAuth, controller.editBook)

  // error handling middleware
  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
  })

}

export default handleLibraryRequest;
