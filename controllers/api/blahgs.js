require('dotenv').config()
const Blahg = require('../../models/blahg')

const createBlahg = async(req, res, next) => {
     try {
          const createdBlahg = await Blahg.create(req.body)
          res.locals.data.blahg = createdBlahg
          next()
     } catch (error) {
          res.status(400).json({msg: error.message})
     }
}

const getBlahgs = async(req, res,next) => {
     try {
          const blahgs = await Blahg.find(req.body)
          res.locals.data.blahgs = blahgs
          next()
     } catch (error) {
          res.status(400).json({msg:error.message})
     }
}
const updateBlahg = 