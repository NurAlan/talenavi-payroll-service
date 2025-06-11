export default (sequelize, DataTypes) => {
  const Payroll = sequelize.define('Payroll', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employeeId: DataTypes.INTEGER,
    month: DataTypes.DATE,
    calculatedSalary: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'payroll',
    underscored: true,
    timestamps: true,
    paranoid: true
  });

  Payroll.associate = models => {
    Payroll.belongsTo(models.Employee, { foreignKey: 'employeeId' });
  };

  return Payroll;
};
