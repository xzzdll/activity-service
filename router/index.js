const router = require('koa-router')();
const upload = require('../controllers/upload.js')

router.post('/image/upload', upload.image);

module.exports = router