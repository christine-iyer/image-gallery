const { Schema, model } = require('mongoose')

const loloSchema = new Schema({
     link: String, 
     alt: String, 
     category: String, 
     likes: Number
    

}, {
timestamps: true
})

module.exports = model('Lolo', loloSchema)