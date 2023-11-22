require('dotenv').config()
const Image = require('../../models/image')

const destroyImage = async (req, res, next) => {
     try {
         const deletedImage = await Image.findByIdAndDelete(req.params.id)
         res.locals.data.image = deletedImage
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const updateImage = async (req, res, next) => {
     try {
         const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true })
         res.locals.data.image = updatedImage
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const createImage = async (req, res, next) => {
     try {
         const createdImage = await Image.create(req.body)
         res.locals.data.image = createdImage
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 
 const getImages= async (req, res, next) => {
     try {
         
         const images = await Image.find(req.body)
         res.locals.data.images = images 
         next()
     } catch (error) {
         res.status(400).json({ msg: error.message })
     }
 }
 const respondWithImages = (req, res) => {
     res.json(res.locals.data.images)
 }
 
 const respondWithImage = (req, res) => {
     res.json(res.locals.data.image)
 }
 
 
 
 module.exports = {
     destroyImage,
     updateImage,
     getImages,
     createImage,
     respondWithImage, 
     respondWithImages
 }