export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attendance', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      employee_id: {
        type: Sequelize.INTEGER,
        references: { model: 'employee', key: 'id' },
        onDelete: 'CASCADE'
      },
      date: {
        type: Sequelize.DATEONLY
      },
      time: {
        type:Sequelize.TIME
      },
      status: {
        type: Sequelize.ENUM('hadir', 'terlambat', 'cuti', 'alfa')
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('attendance')
  }
}