const router = require('express').Router()
const saylorCtrl = require('../../controllers/api/saylors')


router.delete('/:id', saylorCtrl.deleteSaylor, saylorCtrl.respondWithSaylor)
router.put('/:id', saylorCtrl.updateSaylor, saylorCtrl.respondWithSaylor)
router.post('/', saylorCtrl.createSaylor, saylorCtrl.respondWithSaylor)
router.get('/:id', saylorCtrl.getSaylors, saylorCtrl.respondWithSaylor)
router.get('/', saylorCtrl.getSaylors, saylorCtrl.respondWithSaylors)
module.exports = router
