// Sequelize model for Audience Segment

module.exports = (sequelize, DataTypes) => {
  const Segment = sequelize.define("Segment", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    rules: { type: DataTypes.JSONB, allowNull: false }, // The conditions/rules as JSON
    audienceSize: { type: DataTypes.INTEGER, defaultValue: 0 },
    createdBy: { type: DataTypes.UUID, allowNull: false }, // userId
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  Segment.associate = (models) => {
    Segment.hasMany(models.Campaign, { foreignKey: "segmentId" });
  };
  return Segment;
};
