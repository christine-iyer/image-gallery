require('dotenv').config()
const Blahg = require('../../models/blahg')

const deleteBlahg = async (req, res, next) => {
    try {
        const deletedBlahg = await Blahg.findByIdAndDelete(req.params.id)
        res.locals.data.blahg = deletedBlahg
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const updateBlahg = async (req, res, next) => {
    try {
        const updatedBlahg = await Blahg.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.locals.data.blahg = updatedBlahg
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const createBlahg = async (req, res, next) => {
    try {
        const createdBlahg = await Blahg.create(req.body)
        res.locals.data.blahg = createdBlahg
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const getBlahgs = async (req, res, next) => {
    try {

        const blahgs = await Blahg.find(req.body)
        res.locals.data.blahgs = blahgs
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
const respondWithBlahgs = (req, res) => {
    res.json(res.locals.data.blahgs)
}

const respondWithBlahg = (req, res) => {
    res.json(res.locals.data.blahg)
}
module.exports = {
    deleteBlahg,
    updateBlahg,
    getBlahgs,
    createBlahg,
    respondWithBlahg,
    respondWithBlahgs
}