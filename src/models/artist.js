const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    static associate(models) {
      Artist.hasMany(models.Album, {
        foreignKey: "artistId",
      });
    }
  }
  Artist.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Artist",
      timestamps: false,
    }
  );
  return Artist;
};
