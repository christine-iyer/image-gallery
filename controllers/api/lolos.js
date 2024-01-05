require('dotenv').config()
const Lolo = require('../../models/lolo')

const deleteLolo = async (req, res, next) => {
     try {
         const deletedLolo = await Lolo.findByIdAndDelete(req.params.id)
         res.locals.data.lolo = deletedLolo
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const updateLolo = async (req, res, next) => {
     try {
         const updatedLolo = await Lolo.findByIdAndUpdate(req.params.id, req.body, { new: true })
         res.locals.data.lolo = updatedLolo
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const createLolo = async (req, res, next) => {
     try {
         const createdLolo = await Lolo.create(req.body)
         res.locals.data.lolo = createdLolo
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const getLolos= async (req, res, next) => {
     try {
         
         const lolos = await Lolo.find(req.body)
         res.locals.data.lolos = lolos 
         lolos.reverse()
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 const respondWithLolos = (req, res) => {
     res.json(res.locals.data.lolos)
 }
 
 const respondWithLolo = (req, res) => {
     res.json(res.locals.data.lolo)
 }
 
 
 
 module.exports = {
     deleteLolo,
     updateLolo,
     getLolos,
     createLolo,
     respondWithLolo, 
     respondWithLolos
 }