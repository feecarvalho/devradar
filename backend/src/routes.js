const { Router } = require('express');
const axios = require('axios');

const Dev = require('./models/Dev');

const routes = Router();

routes.post('/devs', async (req, res) => {

    const { github_username, techs, latitude, longitude } = req.body;

    const response = await axios.get(`https://api.github.com/users/${github_username}`);

    const { name = login, avatar_url, bio} = response.data;

    // Converter TECHS em array de string para o database
    const techsArray = techs.split(',').map(tech => tech.trim());

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
});

module.exports = routes;