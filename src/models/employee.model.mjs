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
    Employee.belongsTo(models.User, { foreignKey: 'userId' })
    Employee.hasMany(models.Attendance, { foreignKey: 'employeeId' })
    Employee.hasMany(models.Bonus, { foreignKey: 'employeeId' })
    Employee.hasMany(models.Payroll, { foreignKey: 'employeeId' })
  }

  return Employee
}
