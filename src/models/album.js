const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {
      console.log(models);
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
      genre: DataTypes.INTEGER,
      artistId: {
        type: DataTypes.INTEGER,
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
