const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {
      Album.belongsTo(models.Artist, {
        foreignKey: "artistId",
        onDelete: "CASCADE",
      });
      Album.hasMany(models.Track, {
        foreignKey: "albumId",
      });
    }
  }
  Album.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      name: DataTypes.STRING,
      genre: DataTypes.STRING,
      artistId: {
        type: DataTypes.STRING,
        references: {
          model: "Artist",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Album",
      timestamps: false,
    }
  );
  return Album;
};
