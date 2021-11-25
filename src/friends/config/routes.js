// importing controller, db model and repository
import isAuth from '../../util/isAuth.js'

import friendsController from "../friends/controller.js";
import profile from "./db.js"
import friendsRepository from "../friends/repository.js"

const handlefriendsRequest = (app) => {
  
  const repository = friendsRepository( profile );
  const controller = friendsController({ repository });
  
  app.get('/friends/get', isAuth, controller.getFriends)
  app.post('/friends/add', isAuth, controller.addFriend)
  app.delete('/friends/remove', isAuth, controller.removeFriend)
  app.put('/friends/toggle', isAuth, controller.toggleCloseFriend)

  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
  })

}

export default handlefriendsRequest;

