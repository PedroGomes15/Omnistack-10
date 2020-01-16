const mongoose = require('mongoose')
const pointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
    name: String,
    github_user: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: pointSchema,
        index: '2dsphere'
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Dev', DevSchema)