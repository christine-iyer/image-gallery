const router = require('express').Router()
const timeCtrl = require('../../controllers/api/times')


router.delete('/:id', timeCtrl.deleteTime, timeCtrl.respondWithTime)
router.put('/:id', timeCtrl.updateTime, timeCtrl.respondWithTime)
router.post('/', timeCtrl.createTime, timeCtrl.respondWithTime)
router.get('/:id', timeCtrl.getTimes, timeCtrl.respondWithTime)
router.get('/', timeCtrl.getTimes, timeCtrl.respondWithTimes)
module.exports = router