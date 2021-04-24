const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate(models) {
      Track.belongsTo(models.Album, {
        foreignKey: "albumId",
        onDelete: "CASCADE",
      });
    }
  }
  Track.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      name: DataTypes.STRING,
      duration: DataTypes.FLOAT,
      timesPlayed: DataTypes.INTEGER,
      albumId: {
        type: DataTypes.STRING,
        references: {
          model: "Album",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Track",
      timestamps: false,
    }
  );
  return Track;
};
