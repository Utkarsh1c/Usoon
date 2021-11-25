import makePlaylist from './playlist.js';
import add from './use_cases/add.js';
import get from './use_cases/get.js';
import del from './use_cases/del.js';
import getPlaylistData from '../util/getPlaylistData.js'
import jwt from 'jsonwebtoken'

export default ({ repository, playlist }) => {

  // adds playlist in db
  const addPlaylist = (req, res, next) => {
    const addPlaylistCase = add({ repository, makePlaylist, getPlaylistData });
    const userId = req.userId;
    const { playlist_url, platform } = req.body;
    addPlaylistCase.execute( userId, playlist_url, platform )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  // get playlist from a user
  const getPlaylists = (req, res, next) => {
    const getPlaylistsCase = get({ repository });
    let userId = req.userId;
    const { profileId } = req.query;
    if (profileId)
      userId = profileId;
    getPlaylistsCase.execute( userId )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  // delete a user playlist
  const deletePlaylist = (req, res, next) => {
    const deletePlaylistCase = del({ repository });
    const { id } = req.query;
    deletePlaylistCase.execute( id )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  // temporary info route
  const getInfo = (req, res, next) => {
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
      const result = {
          user : decodedToken.data
      }
      res.json(result); 
  }

  return Object.freeze({
    addPlaylist,
    getPlaylists,
    deletePlaylist,
    getInfo
  })
}