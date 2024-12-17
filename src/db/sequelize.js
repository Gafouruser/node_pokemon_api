require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pockemon");
const bcrypt = require("bcrypt");

let sequelize;

if (process.env.NODE_ENV === "production") {
  console.log("Production Configuration");
  console.log("DB_HOST utilisé :", process.env.DB_HOST); // Debugging

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || "127.0.0.1", // Force IPv4
      port: process.env.DB_PORT || 3306,
      dialect: "mysql",
      dialectOptions: {
        timezone: "+02:00",
      },
      logging: false,
    }
  );
} else {
  console.log("Development Configuration");
  sequelize = new Sequelize("pokedex", "root", "", {
    host: "127.0.0.1", // IPv4 forcé pour dev
    port: "3308",
    dialect: "mariadb",
    dialectOptions: {
      timezone: "+02:00", // Format valide
    },
    logging: false,
  });
}

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then(() => {
    console.log("La base de données a bien été initialisée !");
    pokemons.forEach((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      });
    });

    bcrypt.hash("pikachu", 10).then((hash) => {
      User.create({
        username: "pikachu",
        password: hash,
      });
    });
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};

