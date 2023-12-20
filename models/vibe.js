const { Schema, model } = require('mongoose')

const vibeSchema = new Schema({
     author: String, 
     title: String, 
     category: String, 
     text: String, 
     image: String, 
     like: Number
}, {timestamps: true
})
module.exports = model("Vibe", vibeSchema)