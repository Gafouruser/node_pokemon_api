const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pockemon");
const bcrypt = require("bcrypt");

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
      dialectOptions: {
        timezone: "Etc/GMT-2",
      },
      logging: false,
    }
  );
} else {
  sequelize = new Sequelize("pokedex", "root", "", {
    host: "localhost",
    port: "3308",
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

    bcrypt.hash("pikachu", 10).then((hash) => {
      User.create({
        username: "pikachu",
        password: hash,
      }).then((user) => console.log(user.toJSON()));
    });

    console.log("La base de donnees a bien ete initialisee !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
