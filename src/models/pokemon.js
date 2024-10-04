const validTypes = ['Plante', 'Poisson', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fee']

module.exports = (sequilize, DataTypes) => {
  return sequilize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Le nom est deja pris.'
        },
        validate: {
          notEmpty: { msg: "Le nom ne peut pas etre vide." },
          notNull: { msg: "Le nom est une propriete requise." },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie",
          },
          min: {
            args: [0],
            msg: "Les points de vie doivent etre superieurs ou egals a 0",
          },
          max: {
            args: [999],
            msg: "Les points de vie doivent etre inferieurs ou egals a 999",
          },
          notNull: { msg: "Les points de vie sont une propriete requise." },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de degats.",
          },
          min: {
            args: [0],
            msg: "Les points de degats doivent etre superieurs ou egals a 0",
          },
          max: {
            args: [99],
            msg: "Les points de degats doivent etre inferieurs ou egals a 99",
          },
          notNull: { msg: "Les points de degats sont une propriete requise." },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Utilisez une url valide pour l'image" },
          notNull: { msg: "L'image est une propriete requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set() {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypeValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit avoir au moins un type.");
            }
            if (value.split(",").lenght > 3) {
              throw new Error("Un pokemon ne peut pas avoir plus de 3 types");
            }
            value.split(',').forEach(type => {
                if(!validTypes.includes(type)) {
                    throw new Error(`Le type d\'un pokemon doit appartenir a la liste suivante : ${validTypes}`)
                }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
