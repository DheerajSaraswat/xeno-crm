// Sequelize model for campaign delivery logs

module.exports = (sequelize, DataTypes) => {
  const CommunicationLog = sequelize.define("CommunicationLog", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    campaignId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: { type: DataTypes.STRING, allowNull: false }, // "SENT", "FAILED"
    sentAt: { type: DataTypes.DATE, allowNull: false },
    deliveryReceiptAt: { type: DataTypes.DATE, allowNull: true },
    error: { type: DataTypes.STRING, allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  CommunicationLog.associate = (models) => {
    CommunicationLog.belongsTo(models.Campaign, { foreignKey: "campaignId" });
    CommunicationLog.belongsTo(models.Customer, { foreignKey: "customerId" });
  };
  return CommunicationLog;
};
