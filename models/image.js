const { Schema, model } = require('mongoose')

const imageSchema = new Schema({
     link: String, 
     alt: String,  
     like: Number, default:0
    

}, {
timestamps: true
})

module.exports = model('NewImage', imageSchema)