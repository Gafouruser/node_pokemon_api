const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { success, getUniqueId } = require("./helper");
let pokemons = require("./mock-pockemon");

const app = express();
const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello, Express !"));

app.get("/api/pokemons", (req, res) => {
  message = "La liste des pokemons a bien ete recuperee.";
  res.json(success(message, pokemons));
});

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokemon a bien ete trouve";
  res.json(success(message, pokemon));
});

app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} a bien ete cree.`;
  res.json(success(message, pokemonCreated));
});

app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `Le pokemon ${pokemonUpdated.name} a ete modifie.`;
  res.json(success(message, pokemonUpdated));
});

app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons = pokemons.filter(pokemon => pokemon.id !== id)
  const message = `Le pokemon ${pokemonDeleted.name} a ete supprime.`
  res.json(success(message, pokemonDeleted))
})

app.listen(port, () =>
  console.log(
    `Notre application Node est demarree sur : http://localhost:${port}`
  )
);
