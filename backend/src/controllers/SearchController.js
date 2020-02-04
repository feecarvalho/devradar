const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query;
        
        // Converte as techs do req.query em string para pesquisa
        const arrayTechs = parseStringAsArray(techs);
        
        // Filtra os usuarios por techs e um raio de 10km
        const devs = await Dev.find({
            techs: {
                $in: arrayTechs,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        
        return res.json({ devs })
    }
}