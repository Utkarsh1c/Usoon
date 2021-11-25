    import multer from 'multer';
    import multerS3 from 'multer-s3'
    import aws from 'aws-sdk';

    const s3 = new aws.S3();

    aws.config.update({
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.SECRETACCESSKEY,
        region: 'eu-west-3'
    });

    const upload = multer({
        storage: multerS3({
          acl: "public-read",
          s3: s3,
          bucket: 'usoon',
          metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
          },
          key: function (req, file, cb) {
            // cb(null, file.originalname); //set unique file name if you wise using Date.toISOString()
            // EXAMPLE 1
            cb(null, Date.now() + '-' + file.originalname);
            // EXAMPLE 2
            // cb(null, new Date().toISOString() + '-' + file.originalname);

        }
        }),
        limits: { fileSize: 1024 * 1024 * 50 }, // 50MB
    // FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
        fileFilter: function(req, file, cb) {
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
            } else {
            cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
            }
        }
      });

    export default upload;
