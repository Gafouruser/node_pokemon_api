const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequilize");
const auth = require('../auth/auth')

module.exports = (app) => {
  app.post("api/pokemons/", auth, (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Le pokemon ${req.body.name} a bien ete cree`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "Le pokemon n'a pas pu etre ajoute. Reessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
