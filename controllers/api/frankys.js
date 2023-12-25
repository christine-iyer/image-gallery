require('dotenv').config()
const Franky = require('../../models/franky')

const deleteFranky = async (req, res, next) => {
    try {
        const deletedFranky = await Franky.findByIdAndDelete(req.params.id)
        res.locals.data.franky = deletedFranky
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const updateFranky = async (req, res, next) => {
    try {
        const updatedFranky = await Franky.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.locals.data.franky = updatedFranky
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const createFranky = async (req, res, next) => {
    try {
        const createdFranky = await Franky.create(req.body)
        res.locals.data.franky = createdFranky
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const getFrankys = async (req, res, next) => {
    try {

        const frankys = await Franky.find(req.body)
        res.locals.data.frankys = frankys
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
const respondWithFrankys = (req, res) => {
    res.json(res.locals.data.frankys)
}

const respondWithFranky = (req, res) => {
    res.json(res.locals.data.franky)
}
module.exports = {
    deleteFranky,
    updateFranky,
    getFrankys,
    createFranky,
    respondWithFranky,
    respondWithFrankys
}