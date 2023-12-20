require('dotenv').config()
const Saylor = require('../../models/saylor')

const deleteSaylor = async (req, res, next) => {
     try {
         const deletedSaylor = await Saylor.findByIdAndDelete(req.params.id)
         res.locals.data.saylor = deletedSaylor
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const updateSaylor = async (req, res, next) => {
     try {
         const updatedSaylor = await Saylor.findByIdAndUpdate(req.params.id, req.body, { new: true })
         res.locals.data.saylor = updatedSaylor
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const createSaylor = async (req, res, next) => {
     try {
         const createdSaylor = await Saylor.create(req.body)
         res.locals.data.saylor = createdSaylor
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const getSaylors= async (req, res, next) => {
     try {
         
         const saylors = await Saylor.find(req.body)
         res.locals.data.saylors = saylors 
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 const respondWithSaylors = (req, res) => {
     res.json(res.locals.data.saylors)
 }
 
 const respondWithSaylor = (req, res) => {
     res.json(res.locals.data.saylor)
 }
 
 
 
 module.exports = {
     deleteSaylor,
     updateSaylor,
     getSaylors,
     createSaylor,
     respondWithSaylor, 
     respondWithSaylors
 }