const router = require('express').Router()
const frankyCtrl = require('../../controllers/api/frankys')


router.delete('/:id', frankyCtrl.deleteFranky, frankyCtrl.respondWithFranky)
router.put('/:id', frankyCtrl.updateFranky, frankyCtrl.respondWithFranky)
router.post('/', frankyCtrl.createFranky, frankyCtrl.respondWithFranky)
router.get('/:id', frankyCtrl.getFrankys, frankyCtrl.respondWithFranky)
router.get('/', frankyCtrl.getFrankys, frankyCtrl.respondWithFrankys)
module.exports = router