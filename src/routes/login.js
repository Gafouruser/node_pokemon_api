const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privatedKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          const message = "L'utilisateur n'existe pas.";
          return res.status(404).json({ message });
        }

        return bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = "Le mot de passe est incorrect.";
              return res.status(401).json({ message });
            }

            // JWT
            const token = jwt.sign({ userId: user.id }, privatedKey, {
              expiresIn: "24h",
            });

            const message = "L'utilisateur a ete connecte avec succes.";
            return res.json({ message, data: user, token });
          });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas ete connecte. Reesayez dans quelques instants.";
        return res.json({ message, data: error });
      });
  });
};
