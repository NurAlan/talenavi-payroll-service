export default (sequelize, DataTypes) => {
  const Attendance = sequelize.define('attendance', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    status: DataTypes.ENUM('hadir', 'terlambat', 'cuti', 'alfa'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  })

  Attendance.associate = models => {
    Attendance.belongsTo(models.Employee, { foreignKey: 'employee_id' })
  }

  return Attendance
}
