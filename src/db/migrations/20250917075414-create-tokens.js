module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('tokens', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			owner_type: {
				type: Sequelize.STRING(50),
				allowNull: true,
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
			token_type: {
				type: Sequelize.STRING(1), // phân loại: access, refresh, reset...
				allowNull: false,
			},
			token_value: {
				type: Sequelize.STRING(512),
				allowNull: false,
			},
			device_info: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			ip_address: {
				type: Sequelize.STRING(45), // IPv4 hoặc IPv6
				allowNull: true,
			},
			is_active: {
				type: Sequelize.STRING(1), // 0: inactive, 1: active
				allowNull: false,
				defaultValue: '1',
			},
			expires_at: {
				type: Sequelize.STRING(14),
				allowNull: false,
			},
			revoked_at: {
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
				type: Sequelize.DATE,
				allowNull: true,
			},
			updated_by: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
		}),
	down: (queryInterface /* , Sequelize */) =>
		queryInterface.dropTable('tokens'),
};
