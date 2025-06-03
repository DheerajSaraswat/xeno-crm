// Sequelize model for Campaign

module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define("Campaign", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    segmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    objective: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    audienceSize: { type: DataTypes.INTEGER, defaultValue: 0 },
    sent: { type: DataTypes.INTEGER, defaultValue: 0 },
    failed: { type: DataTypes.INTEGER, defaultValue: 0 },
    createdBy: { type: DataTypes.UUID, allowNull: false }, // userId
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  Campaign.associate = (models) => {
    Campaign.belongsTo(models.Segment, { foreignKey: "segmentId" });
    Campaign.hasMany(models.CommunicationLog, { foreignKey: "campaignId" });
  };
  return Campaign;
};
