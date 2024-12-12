const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemons', (req, res) => {
        Pokemon.create(req.body)
        .then(pokemon => {
            const message = `Le pokemon ${req.body.name} a bien ete cree.`
            res.json({ message, data: pokemon })
        })
    })
}