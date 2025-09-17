module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('cart_items', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			cart_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'carts',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			variant_id: {
				type: Sequelize.BIGINT,
				allowNull: true, // có thể null nếu không chọn biến thể
				references: {
					model: 'watch_variants',
					key: 'id',
				},
				onDelete: 'SET NULL',
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			unit_price: {
				type: Sequelize.DOUBLE,
				allowNull: false,
			},
			total_price: {
				type: Sequelize.DOUBLE,
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
		queryInterface.dropTable('cart_items'),
};
