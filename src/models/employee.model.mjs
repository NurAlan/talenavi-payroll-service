export default (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: DataTypes.INTEGER,
    position: DataTypes.STRING,
    baseSalary: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },{
    tableName: 'employee',
    underscored: true,
    timestamps: true,
    paranoid: true
  })

  Employee.associate = models => {
    Employee.belongsTo(models.User, { foreignKey: 'user_id' })
    Employee.hasMany(models.Attendance, { foreignKey: 'employee_id' })
    Employee.hasMany(models.Bonus, { foreignKey: 'employee_id' })
    Employee.hasMany(models.Payroll, { foreignKey: 'employee_id' })
  }

  return Employee
}
