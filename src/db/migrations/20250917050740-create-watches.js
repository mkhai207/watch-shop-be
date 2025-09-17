module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('watches', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			code: {
				type: Sequelize.STRING(10),
				allowNull: true,
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			model: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			case_material: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			case_size: {
				type: Sequelize.DOUBLE,
				allowNull: true,
			},
			strap_size: {
				type: Sequelize.DOUBLE,
				allowNull: true,
			},
			gender: {
				type: Sequelize.STRING(1),
				allowNull: true,
			},
			water_resistance: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			release_date: {
				type: Sequelize.STRING(14),
				allowNull: true,
			},
			sold: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			base_price: {
				type: Sequelize.DOUBLE,
				allowNull: false,
			},
			rating: {
				type: Sequelize.DOUBLE,
				allowNull: true,
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			thumbnail: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			slider: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			created_at: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			created_by: {
				type: Sequelize.STRING(14),
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
			category_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'categorys',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			brand_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'brands',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			movement_type_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'movement_types',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
		}),
	down: (queryInterface /* , Sequelize */) =>
		queryInterface.dropTable('watches'),
};
