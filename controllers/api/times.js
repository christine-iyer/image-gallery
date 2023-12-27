require('dotenv').config()
const Time = require('../../models/time')

const deleteTime = async (req, res, next) => {
    try {
        const deletedTime = await Time.findByIdAndDelete(req.params.id)
        res.locals.data.time = deletedTime
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const updateTime = async (req, res, next) => {
    try {
        const updatedTime = await Time.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.locals.data.time = updatedTime
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const createTime = async (req, res, next) => {
    try {
        const createdTime = await Time.create(req.body)
        res.locals.data.time = createdTime
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const getTimes = async (req, res, next) => {
    try {

        const times = await Time.find(req.body)
        res.locals.data.times = times
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
const respondWithTimes = (req, res) => {
    res.json(res.locals.data.times)
}

const respondWithTime = (req, res) => {
    res.json(res.locals.data.time)
}
module.exports = {
    deleteTime,
    updateTime,
    getTimes,
    createTime,
    respondWithTime,
    respondWithTimes
}