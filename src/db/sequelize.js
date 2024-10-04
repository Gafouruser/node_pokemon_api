const { Sequelize, DataTypes } = require("sequilize");
const PokemonModel = require("../models/pokemon");
const pokemons = require("./mock-pokemon");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize("pokedex", "username", "password", {
    host: "",
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    logging: true,
  });
} else {
  sequelize = new Sequelize("pokedex", "username", "password", {
    host: "",
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    logging: false,
  });
}

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync().then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    bcrypt
      .hash("pikachu", 10)
      .then((hash) => {
        User.create({
          username: "pikachu",
          password: hash,
        });
      })
      .then((user) => console.log(user.toJSON()));

    console.log("La base de donnees a ete bien initialisee !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
