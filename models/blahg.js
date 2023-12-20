const { Schema, model } = require('mongoose')

const blahgSchema = new Schema({
     author: String, 
     title: String, 
     category: String, 
     text: String, 
     image: String, 
     like: Number
}, {timestamps: true
})
module.exports = model("Blahg", blahgSchema)