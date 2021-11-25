// importing controller, db model and repository

import playlistController from "../playlist/controller.js";
import playlist from "./db.js"
import playlistRepository from "../playlist/repository.js"
import isAuth from '../../util/isAuth.js'

const handlePlaylistRequest = (app) => {
  
  // pass model in repository for queries
  const repository = playlistRepository( playlist );
  // controller to manage routes
  const controller = playlistController({ repository, playlist });
  
  app.post('/playlist/add', isAuth, controller.addPlaylist)
  app.get('/playlist/get', isAuth, controller.getPlaylists)
  app.delete('/playlist/delete', isAuth, controller.deletePlaylist)

  // error handling middleware
  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
  })

}

export default handlePlaylistRequest;
