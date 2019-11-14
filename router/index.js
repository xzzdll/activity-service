const router = require('koa-router')();
const { uploadImage } = require('../controllers/upload.js')
const {get,set} = require('../controllers/activity.js')

router.post('/image/upload', uploadImage);

router.get('/activity/get', get);
router.post('/activity/set', set);

module.exports = router