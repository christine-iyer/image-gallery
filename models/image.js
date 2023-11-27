const { Schema, model } = require('mongoose')

const imageSchema = new Schema({
     link: String, 
     alt: String,  
     likes: Number
    

}, {
timestamps: true
})

module.exports = model('Image', imageSchema)