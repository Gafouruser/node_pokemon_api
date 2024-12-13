const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemons', (req, res) => {
        Pokemon.create(req.body)
        .then(pokemon => {
            const message = `Le pokemon ${req.body.name} a bien ete cree.`
            res.json({ message, data: pokemon })
        })
        .catch(error => {
            const message = 'Le pokemon n\'a pas pu etre cree. Reesayez dans quelques instants.'
            res.status(500).json({ message, data: error })
        })
    })
}