export default (sequelize, DataTypes) => {
  const Bonus = sequelize.define('Bonus', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employeeId: DataTypes.INTEGER,
    month: DataTypes.DATE,
    amount: DataTypes.INTEGER,
    description: {type: DataTypes.STRING, allowNull: true},
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },{
    tableName: 'bonus',
    underscored: true,
    timestamps: true,
    paranoid: true
  })

  Bonus.associate = models => {
    Bonus.belongsTo(models.Employee, { foreignKey: 'employeeId' })
  }

  return Bonus
}
