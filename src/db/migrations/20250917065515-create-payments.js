module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('payments', {
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
			transaction_code: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			amount: {
				type: Sequelize.DOUBLE,
				allowNull: false,
			},
			method: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			status: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			type: {
				type: Sequelize.STRING(1), // 0: Thanh toán, 1: Hoàn tiền
				allowNull: false,
				defaultValue: '0',
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
		queryInterface.dropTable('payments'),
};
