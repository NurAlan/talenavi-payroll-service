export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employee', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'user', key: 'id' },
        onDelete: 'CASCADE',
        unique: true,
      },
      position: {
        type: Sequelize.STRING
      },
      base_salary: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('employee')
  }
}