const { Pokemon } = require("../db/sequelize");
const auth = require('../auth/auth')

module.exports = (app) => {
  app.delete("api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message =
            "Le pokemon demande n'existe pas. Reesayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }

        const pokemonDeleted = pokemon;
        return Pokemon.destroy({
          where: { id: pokemon.id },
        }).then((_) => {
          const message = `Le pokemon avec l\'identifiant ${pokemonDeleted.id} a bien ete supprime.`;
          res.json({ message, data: pokemonDeleted });
        });
      })
      .catch((error) => {
        const message =
          "Le pokemon n'a pas pu etre supprime. Reessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
