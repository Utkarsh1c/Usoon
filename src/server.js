import express from "express";
import authRoutes from "./auth/config/routes.js";
import experienceRoutes from './experience/config/routes.js'
import imageRoutes from './image/config/routes.js'
import playlistRoutes from './playlist/config/routes.js'
import profileRoutes from './profile/config/routes.js' 
import friendsRoutes from './friends/config/routes.js'
import libraryRoutes from './library/config/routes.js'
import accountRoutes from './account/config/routes.js'

import dotenv from 'dotenv'
dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}))

authRoutes(server);
experienceRoutes(server);
imageRoutes(server);
playlistRoutes(server);
profileRoutes(server);
friendsRoutes(server);
libraryRoutes(server);
accountRoutes(server);


export default server;
