'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.Order,{
        foreignKey: "order_id",
        as:"Orders"
      });
      OrderDetail.belongsTo(models.Product,{
        foreignKey: "product_id",
        as: "Products"
      });
      OrderDetail.belongsTo(models.Shipping,{
        foreignKey: "user_add_id",
        as: "Shippings" 
      })
    }
  }
  OrderDetail.init({
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    user_add_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};