module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('order_status_history', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			order_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'orders',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			status_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'config_order_status',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			note: {
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
		queryInterface.dropTable('order_status_history'),
};
