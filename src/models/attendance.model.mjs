export default (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employeeId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    status: DataTypes.ENUM('hadir', 'terlambat', 'cuti', 'alfa'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'attendance',
    underscored: true,
    timestamps: true,
    paranoid: true
  })

  Attendance.associate = models => {
    Attendance.belongsTo(models.Employee, { foreignKey: 'employee_id' })
  }

  return Attendance
}
