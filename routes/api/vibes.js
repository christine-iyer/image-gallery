const router = require('express').Router()
const vibeCtrl = require('../../controllers/api/vibes')


router.delete('/:id', vibeCtrl.deleteVibe, vibeCtrl.respondWithVibe)
router.put('/:id', vibeCtrl.updateVibe, vibeCtrl.respondWithVibe)
router.post('/', vibeCtrl.createVibe, vibeCtrl.respondWithVibe)
router.get('/:id', vibeCtrl.getVibes, vibeCtrl.respondWithVibe)
router.get('/', vibeCtrl.getVibes, vibeCtrl.respondWithVibes)
module.exports = router