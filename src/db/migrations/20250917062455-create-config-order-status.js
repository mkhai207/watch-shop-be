module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('config_order_status', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			code: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			hex_code: {
				type: Sequelize.STRING(7),
				allowNull: true,
			},
			color: {
				type: Sequelize.STRING(20),
				allowNull: true,
			},
			sort_order: {
				type: Sequelize.INTEGER,
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
		queryInterface.dropTable('config_order_status'),
};
