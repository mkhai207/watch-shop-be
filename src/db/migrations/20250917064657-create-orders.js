module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('orders', {
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
			user_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			total_amount: {
				type: Sequelize.DOUBLE, // tổng số tiền sau giảm giá
				allowNull: false,
			},
			discount_code: {
				type: Sequelize.STRING(20),
				allowNull: true,
			},
			discount_amount: {
				type: Sequelize.DOUBLE,
				allowNull: true,
			},
			final_amount: {
				type: Sequelize.DOUBLE,
				allowNull: false,
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
			payment_status: {
				type: Sequelize.STRING(1), // 0: chưa thanh toán, 1: đã thanh toán, 2: hoàn tiền
				allowNull: false,
				defaultValue: '0',
			},
			payment_method: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			shipping_address: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			shipping_fee: {
				type: Sequelize.DOUBLE,
				allowNull: true,
			},
			note: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			guess_name: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			guess_email: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			guess_phone: {
				type: Sequelize.STRING(15),
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
		queryInterface.dropTable('orders'),
};
