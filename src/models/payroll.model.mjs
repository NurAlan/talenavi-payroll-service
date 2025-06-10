export default (sequelize, DataTypes) => {
  const Payroll = sequelize.define('payroll', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_id: DataTypes.INTEGER,
    month: DataTypes.STRING,
    calculated_salary: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  Payroll.associate = models => {
    Payroll.belongsTo(models.Employee, { foreignKey: 'employee_id' });
  };

  return Payroll;
};
