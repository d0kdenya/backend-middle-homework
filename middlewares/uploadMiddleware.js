const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, res, cb) {
    cb(null, 'public/uploads')
  },
  filename(req, file, cb) {
    cb(null, `${ Date.now() }-${ file.originalname }`)
  }
})

module.exports = multer({ storage })