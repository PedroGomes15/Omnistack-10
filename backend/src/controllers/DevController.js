const axios = require('axios')
const Dev = require('../models/dev')
const parseString = require('../utils/parseStringAtArray')

module.exports = {
    async index(request, response) {
        const devs = await Dev.find()
        return response.json(devs)
    },

    async store(request, response) {

        const { github_user, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_user })

        if (!dev) {
            const user = await axios.get(`https://api.github.com/users/${github_user}`)
            console.log(user.data)
            const { name, avatar_url: avatar, bio, login } = user.data

            const techsArray = parseString(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_user,
                name: name || login,
                bio,
                avatar_url: avatar,
                techs: techsArray,
                location
            })

        }

        return response.json(dev)
    }
}