module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('movement_types', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			code: {
				type: Sequelize.STRING(10),
				allowNull: true,
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			created_at: {
				type: Sequelize.STRING(14),
				allowNull: false,
			},
			created_by: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			updated_at: {
				type: Sequelize.STRING(14),
				allowNull: true,
			},
			updated_by: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			del_flag: {
				type: Sequelize.STRING(1),
				allowNull: false,
				defaultValue: '0',
			},
		}),
	down: (queryInterface /* , Sequelize */) =>
		queryInterface.dropTable('movement_types'),
};
