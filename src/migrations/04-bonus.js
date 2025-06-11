export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bonus', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      employee_id: {
        type: Sequelize.INTEGER,
        references: { model: 'employee', key: 'id' },
        onDelete: 'CASCADE'
      },
      month: {
        type: Sequelize.STRING
      },
      amount: {
        type:Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('bonuse')
  }
}