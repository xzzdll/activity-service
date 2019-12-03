const router = require('koa-router')();
const { uploadImage } = require('../controllers/upload.js')
const { get, set, getAll, delete} = require('../controllers/activity.js')

router.post('/image/upload', uploadImage);

router.get('/activity/get', get);
router.post('/activity/set', set);
router.get('/activity/getAll', getAll);
router.get('/activity/delete', delete);

module.exports = router