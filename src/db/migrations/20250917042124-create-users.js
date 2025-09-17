module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('users', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			code: {
				type: Sequelize.STRING(20),
				allowNull: true,
			},
			username: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			phone_number: {
				type: Sequelize.STRING(15),
				allowNull: true,
			},
			first_name: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			last_name: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			gender: {
				type: Sequelize.STRING(1), // 0: Nam, 1: Nữ, 2: Khác
				allowNull: true,
			},
			date_of_birth: {
				type: Sequelize.STRING(8), // dạng yyyymmdd
				allowNull: true,
			},
			address: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			status: {
				type: Sequelize.STRING(1), // 0: Hoạt động, 1: Không hoạt động
				allowNull: false,
				defaultValue: '0',
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
			role_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'roles',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
		}),
	down: (queryInterface /* , Sequelize */) =>
		queryInterface.dropTable('users'),
};
