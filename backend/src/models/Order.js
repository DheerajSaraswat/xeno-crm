// Sequelize model for Order

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    order_date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false }, // e.g. "completed", "cancelled"
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  Order.associate = (models) => {
    Order.belongsTo(models.Customer, { foreignKey: "customerId" });
  };
  return Order;
};
