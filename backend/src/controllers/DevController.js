const axios = require("axios");
const Dev = require("../models/dev");
const parseString = require("../utils/parseStringAtArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    const { github_user, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_user });

    if (!dev) {
      const user = await axios.get(
        `https://api.github.com/users/${github_user}`
      );
      const { name, avatar_url: avatar, bio, login } = user.data;

      const techsArray = parseString(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_user,
        name: name || login,
        bio,
        avatar_url: avatar,
        techs: techsArray,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  },

  async update(request, response) {
    const {
      github_user,
      bio,
      name,
      techs,
      latitude,
      longitude,
      avatar_url
    } = request.body;
    let dev = await Dev.findOne({ github_user });

    if (dev) {
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const techsArray = parseString(techs);

      dev = await Dev.updateOne(
        { github_user },
        {
          bio,
          name,
          techs: techsArray,
          avatar_url,
          location
        }
      );
      return response.json(await Dev.findOne({ github_user }));
    } else {
      return response.json({
        error: "Usuario nao encontrado"
      });
    }
  },

  async destroy(request, response) {
    const { github_user } = request.body;
    let dev = await Dev.findOne({ github_user });

    if (dev) {
      dev = await Dev.deleteOne({ github_user });
      return response.json({
        resultado: "Usuario " + github_user + " deletado com sucesso"
      });
    } else {
      return response.json({
        error: "Usuario nao encontrado"
      });
    }
  }
};
