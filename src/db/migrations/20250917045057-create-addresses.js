module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('addresses', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			city: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			district: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			is_default: {
				type: Sequelize.STRING(1), // 1: mặc định
				allowNull: false,
				defaultValue: '0',
			},
			phone_number: {
				type: Sequelize.STRING(15),
				allowNull: true,
			},
			recipient_name: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			street: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			ward: {
				type: Sequelize.STRING(255),
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
				type: Sequelize.STRING(1), // 1: đã xóa, 0: bình thường
				allowNull: false,
				defaultValue: '0',
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
		}),
	down: (queryInterface /* , Sequelize */) =>
		queryInterface.dropTable('addresses'),
};
