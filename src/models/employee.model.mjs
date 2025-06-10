export default (sequelize, DataTypes) => {
  const Employee = sequelize.define('employee', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: DataTypes.INTEGER,
    position: DataTypes.STRING,
    base_salary: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  })

  Employee.associate = models => {
    Employee.belongsTo(models.User, { foreignKey: 'user_id' })
    Employee.hasMany(models.Attendance, { foreignKey: 'employee_id' })
    Employee.hasMany(models.Bonus, { foreignKey: 'employee_id' })
    Employee.hasMany(models.Payroll, { foreignKey: 'employee_id' })
  }

  return Employee
}
