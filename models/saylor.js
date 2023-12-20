const { Schema, model } = require('mongoose')

const saylorSchema = new Schema({
     link: String, 
     alt: String, 
     category: String, 
     likes: Number
    

}, {
timestamps: true
})

module.exports = model('Saylor', saylorSchema)