'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.level, {
        as: 'level',
        foreignKey: {
          name: 'levelId'
        }
      })
    }
  };
  user.init({
    nik: DataTypes.INTEGER,
    password: DataTypes.STRING,
    nama: DataTypes.STRING,
    jenisKelamin: DataTypes.STRING,
    noHp: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    foto: DataTypes.STRING,
    levelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};