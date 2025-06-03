// Sequelize model for User (Google OAuth)

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    googleId: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  User.associate = (models) => {
    User.hasMany(models.Segment, { foreignKey: "createdBy" });
    User.hasMany(models.Campaign, { foreignKey: "createdBy" });
  };
  return User;
};
