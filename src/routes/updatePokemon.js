const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequilize");
const auth = require('../auth/auth')

module.exports = (app) => {
  app
    .put("api/pokemons/:id", auth, (req, res) => {
      const id = req.params.id;
      Pokemon.update(req.body, {
        where: { id: id },
      }).then((_) => {
        if (pokemon === null) {
          const message =
            "Le pokemon demande n'existe pas. Reesayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }

        return Pokemon.findByPk(id).then((pokemon) => {
          const message = `Le pokemon ${pokemon.name} a bien ete modifie`;
          res.json({ message, data: pokemon });
        });
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }

      const message =
        "Le pokemon n'a pas pu etre modifie. Reessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};
