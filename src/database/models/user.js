'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Address,{
        foreignKey: 'user_id',
        as: "Addresses"
      });
      User.hasOne(models.Order,{
        foreignKey:"user_id",
        as:"Orders"
      })
      User.belongsTo(models.Avatar,{
        foreignKey:"avatar_id",
        as:"Avatars"
      })
      User.belongsTo(models.Rol,{
        foreignKey:"rol_id",
        as:"Rols"
      })
      User.belongsToMany(models.Product,{
        as: "Products",
        through: "Visiteds",
        foreignKey: "user_id",
        otherKey: "product_id",
        timestamps: false
      })
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    avatar_id: DataTypes.INTEGER,
    rol_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};