require('dotenv').config()
const Vibe = require('../../models/vibe')

const deleteVibe = async (req, res, next) => {
    try {
        const deletedVibe = await Vibe.findByIdAndDelete(req.params.id)
        res.locals.data.vibe = deletedVibe
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const updateVibe = async (req, res, next) => {
    try {
        const updatedVibe = await Vibe.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.locals.data.vibe = updatedVibe
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const createVibe = async (req, res, next) => {
    try {
        const createdVibe = await Vibe.create(req.body)
        res.locals.data.vibe = createdVibe
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const getVibes = async (req, res, next) => {
    try {

        const vibes = await Vibe.find(req.body)
        res.locals.data.vibes = vibes
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
const respondWithVibes = (req, res) => {
    res.json(res.locals.data.vibes)
}

const respondWithVibe = (req, res) => {
    res.json(res.locals.data.vibe)
}
module.exports = {
    deleteVibe,
    updateVibe,
    getVibes,
    createVibe,
    respondWithVibe,
    respondWithVibes
}