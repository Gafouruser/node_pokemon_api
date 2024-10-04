const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequilize");
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get("api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;

      if (name.lenght < 2) {
        const message =
          "Le terme de recherche doit contenir au moins 2 caracteres";
        return res.status(400).json({ message });
      }

      Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: ["name"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} qui correspondent au terme de la recherche ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
        .then((pokemons) => {
          const massage = "La liste des pokemons a bien ete recuperee";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message =
            "La liste des pokemons n'a pas pu etre recuperee. Reesayer dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
