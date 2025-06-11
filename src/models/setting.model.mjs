export default (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clockIn: DataTypes.TIME,
    clockOut: DataTypes.TIME,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
      tableName: 'setting',
      underscored: true,
      timestamps: true,
      paranoid: true
    })

  return Setting
}
