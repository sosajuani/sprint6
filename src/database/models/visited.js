'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visited extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Visited.belongsToMany(models.Product,{
        as: 'Products',
        through: "Visiteds",
        foreignKey: "user_id",
        otherKey: "product_id",
        timestamps: false
      });
      Visited.belongsToMany(models.User,{
        as: 'Users',
        through: 'Visiteds',
        foreignKey: 'product_id',
        otherKey: 'user_id',
        timestamps: false
      });
    }
  }
  Visited.init({
    visited: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Visited',
  });
  return Visited;
};