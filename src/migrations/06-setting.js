export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('setting', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      clock_in: {
        type: Sequelize.TIME
      },
      clock_out: {
        type: Sequelize.TIME
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
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('setting')
  }
}