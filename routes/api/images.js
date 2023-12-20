const router = require('express').Router()
const imageCtrl = require('../../controllers/api/images')


router.delete('/:id', imageCtrl.deleteImage, imageCtrl.respondWithImage)
router.put('/:id', imageCtrl.updateImage, imageCtrl.respondWithImage)
router.post('/', imageCtrl.createImage, imageCtrl.respondWithImage)
router.get('/:id', imageCtrl.getImages, imageCtrl.respondWithImage)
router.get('/', imageCtrl.getImages, imageCtrl.respondWithImages)
module.exports = router
