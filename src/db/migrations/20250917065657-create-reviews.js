module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('reviews', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			rating: {
				type: Sequelize.FLOAT,
				allowNull: false, // Rating from 1 to 5
			},
			comment: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			image_url: {
				type: Sequelize.TEXT,
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
			order_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'orders',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			watch_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'watches',
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
		queryInterface.dropTable('reviews'),
};
