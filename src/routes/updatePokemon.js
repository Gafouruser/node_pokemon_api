const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: { id: id }
        })
        .then(_ => {
            return Pokemon.findByPk(id).then(pokemon => {
                if(pokemon === null) {
                    const message = 'Le pokemon demande n\'exite pas. Reesayez avec un autre identifiant'
                    return res.status(404).json({message})
                }
                const message = `Le pokemon ${pokemon.name} a bien ete modifie.`
                res.json({message, data: pokemon})
            })
        })
        .catch(error => {
            const message = 'Le pokemon n\'a pas pu etre modifie. Reesayez dans quelques instants.'
            res.status(500).json({ message, data: error })
        })
    })
}