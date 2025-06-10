export default (sequelize, DataTypes) => {
  const Bonus = sequelize.define('bonus', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_id: DataTypes.INTEGER,
    month: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  })

  Bonus.associate = models => {
    Bonus.belongsTo(models.Employee, { foreignKey: 'employee_id' })
  }

  return Bonus
}
