module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('watch_variants', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
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
			color_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'colors',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			strap_material_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'strap_materials',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			stock_quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			price: {
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
		queryInterface.dropTable('watch_variants'),
};
