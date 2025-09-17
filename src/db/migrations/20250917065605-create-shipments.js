module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('shipments', {
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
			carrier: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			tracking_code: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			status: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			estimated_delivery: {
				type: Sequelize.STRING(14),
				allowNull: true,
			},
			delivered_at: {
				type: Sequelize.STRING(14),
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
		queryInterface.dropTable('shipments'),
};
