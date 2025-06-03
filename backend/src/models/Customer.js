// Sequelize model for Customer

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    total_spend: { type: DataTypes.FLOAT, defaultValue: 0 },
    visits: { type: DataTypes.INTEGER, defaultValue: 0 },
    last_active_at: { type: DataTypes.DATE, allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  Customer.associate = (models) => {
    Customer.hasMany(models.Order, { foreignKey: "customerId" });
    Customer.hasMany(models.CommunicationLog, { foreignKey: "customerId" });
  };
  return Customer;
};
