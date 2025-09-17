module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('permission_role', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
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
			permission_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'permissions',
					key: 'id',
				},
				onDelete: 'CASCADE',
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
		queryInterface.dropTable('permission_role'),
};
