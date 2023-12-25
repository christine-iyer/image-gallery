const { Schema, model } = require('mongoose')

const frankySchema = new Schema({
     author: String, 
     title: String, 
     category: String, 
     text: String, 
     image: String, 
     like: Number
}, {timestamps: true
})
module.exports = model("Franky", frankySchema)