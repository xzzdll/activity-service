const router = require('koa-router')();
const { uploadImage } = require('../controllers/upload.js')
const {get,set,getAll} = require('../controllers/activity.js')

router.post('/image/upload', uploadImage);

router.get('/activity/get', get);
router.post('/activity/set', set);
router.get('/activity/getAll', getAll);

module.exports = router