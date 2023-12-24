const router = require('express').Router()
const loloCtrl = require('../../controllers/api/lolos')


router.delete('/:id', loloCtrl.deleteLolo, loloCtrl.respondWithLolo)
router.put('/:id', loloCtrl.updateLolo, loloCtrl.respondWithLolo)
router.post('/', loloCtrl.createLolo, loloCtrl.respondWithLolo)
router.get('/:id', loloCtrl.getLolos, loloCtrl.respondWithLolo)
router.get('/', loloCtrl.getLolos, loloCtrl.respondWithLolos)
module.exports = router
