module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('discounts', {
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
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			min_order_value: {
				type: Sequelize.DOUBLE,
				allowNull: true,
			},
			max_discount_amount: {
				type: Sequelize.DOUBLE,
				allowNull: true,
			},
			discount_type: {
				type: Sequelize.STRING(1), // 0: fixed, 1: percentage
				allowNull: false,
			},
			discount_value: {
				type: Sequelize.DOUBLE,
				allowNull: false,
			},
			effective_date: {
				type: Sequelize.STRING(14),
				allowNull: false,
			},
			valid_until: {
				type: Sequelize.STRING(14),
				allowNull: false,
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
		queryInterface.dropTable('discounts'),
};
