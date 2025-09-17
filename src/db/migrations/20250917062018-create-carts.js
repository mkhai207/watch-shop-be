module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('carts', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: Sequelize.BIGINT,
				allowNull: true, // cho phép null nếu là khách chưa đăng nhập
				references: {
					model: 'users',
					key: 'id',
				},
				onDelete: 'SET NULL',
			},
			session_id: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			status: {
				type: Sequelize.STRING(20), // active, checked_out, abandoned
				allowNull: false,
				defaultValue: 'active',
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
		queryInterface.dropTable('carts'),
};
