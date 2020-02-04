const axios = require('axios');

const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },


    async store(req, res) {
        
        const { github_username, techs, latitude, longitude } = req.body;
        
        const dev = await Dev.findOne({ github_username });

        if (dev) {
            return res.status(401).json({ error: 'Username already created' });
        }

        const response = await axios.get(`https://api.github.com/users/${github_username}`);
        
        const { name = login, avatar_url, bio} = response.data;
        
        // Converter TECHS em array de string para o database
        const techsArray = parseStringAsArray(techs);
        
        // Organiza latitude e longitude para inserção no database
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }
        
        const newDev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            location,
            techs: techsArray,
        });
        
        return res.json(newDev);
    }
};
