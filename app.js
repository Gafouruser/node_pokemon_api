const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require('./src/db/sequelize');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

// Configuration de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Pokémon API",
      version: "1.0.0",
      description: "Une API pour gérer des Pokémon",
      contact: {
        name: "Gafour",
      },
    },
    servers: [
      {
        url: "https://nodepokemonapi-production.up.railway.app",
        description: "Serveur de production",
      },
      {
        url: "http://localhost:3000",
        description: "Serveur local",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./app.js"], // Inclure le chemin vers les fichiers de routes
};

// Génération de la documentation Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(favicon(__dirname + "/favicon.ico"));
app.use(bodyParser.json());
app.use(cors());

// Initialisation de la base de données
sequelize.initDb();

// Points de terminaison
/**
 * @swagger
 * /:
 *   get:
 *     summary: Retourne un message de bienvenue
 *     description: Vérifie si l'API est en ligne.
 *     responses:
 *       200:
 *         description: Succès, message de bienvenue retourné.
 */
app.get('/', (req, res) => {
  res.json('API Pokémon est en ligne 🚀');
});

// Routes pour les Pokémon
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);

// Gestion des erreurs pour les routes non trouvées
app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandee ! Vous pouvez essayer une autre URL.';
  res.status(404).json({message});
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Notre application Node est démarrée sur : http://localhost:${port}`);
});
