// importing controller, db model and repository

import imageController from '../image/controller.js'
import upload from '../util/imageUpload.js'

const handleImageRequest = (app) => {
  
// app.use(multer({ fileFilter: fileFilter }).single('avatar'));
  
  const controller = imageController({ upload });

  app.post('/image/upload',
//   multer({ limits: { fieldSize: 8 * 1024 * 1024 } }).single(
// //   multer().single(
//     'avatar'
//   ),
    controller.handleImageUpload)
//   controller.uploadImage.single('file'), function (req, res, next) {
//     console.log('Uploaded!');
//     res.send(req.file)})

  // error handling middleware
  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
  })

}

export default handleImageRequest;


