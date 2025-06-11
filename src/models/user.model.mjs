export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'user',
      underscored: true,
      timestamps: true,
      paranoid: true
    }
  );

  User.associate = models => {
    User.hasOne(models.Employee, {
      foreignKey: 'user_id',
      as: 'employee'
    });
  };

  return User;
};
