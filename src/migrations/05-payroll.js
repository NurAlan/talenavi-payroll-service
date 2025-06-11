export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payroll', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      employee_id: {
        type: Sequelize.INTEGER,
        references: { model: 'employee', key: 'id' },
        onDelete: 'CASCADE'
      },
      month: {
        type:Sequelize.DATE
      },
      calculated_salary: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('payroll')
  }
}