const multer = require('multer')

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb) 
        {
            cb(null, __dirname + '/uploads')
        },
        filename: function(req, file, cb)
        {
            cb(null, new Date().getTime().toString() + '-' + file.originalname)
        }
    })

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer(
  {
    storage,
    limits:
        {
          fileSize: 1024 * 1024 * 50
        },
    fileFilter
  }

)
module.exports = upload
