const multer = require('multer')

const storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
      require('fs').writeFileSync('text.txt', 'hello world')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname)
    }
  }
)

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
