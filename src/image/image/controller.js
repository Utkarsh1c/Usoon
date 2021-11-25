export default ({ upload }) => {
    const handleImageUpload = (req, res, next) => {
        const singleUpload = upload.single('file');
        singleUpload(req, res, function (err) {
            if (err) {
              return res.json({
                success: false,
                errors: {
                  title: "Image Upload Error",
                  detail: err.message,
                  error: err,
                },
              });
            }
            const image_url = req.file.location;
            res.json({
                image_url : image_url
            });
        })
    }
    
    

  return Object.freeze({
    handleImageUpload
  })
}