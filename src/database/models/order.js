'use strict';
const {
  Model
} = require('sequelize');
const payment = require('./payment');
const shipping = require('./shipping');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Payment,{
        foreignKey: "payments_id",
        as: "Payments"
      });
      Order.belongsTo(models.User,{
        foreignKey: "user_id",
        as:"Users"
      });
      Order.belongsTo(models.Status,{
        foreignKey: "status_id",
        as: "Statues"
      });
      Order.hasMany(models.OrderDetail, {
        foreignKey:"order_id",
        as: "OrderDetails"
      });
      Order.hasOne(models.Shipping,{
        foreignKey: "order_id",
        as: "Shippings"
      })
    }
  }
  Order.init({
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    payments_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};