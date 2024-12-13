const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        Pokemon.findAll()
        .then(pokemons => {
            const message = 'La liste des pokemons a bien ete recuperee.'
            res.json({ message, data: pokemons })
        })
        .catch(error => {
            const message = 'La liste des pokemons n\'a pas pu etre recuperee. Reesayer dans quelques instants.'
            res.status(500).json({ message, data: error })
        })
    })
}