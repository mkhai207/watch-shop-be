module.exports = (sequelize, DataTypes) => {
	const watch = sequelize.define(
		'watch',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			code: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			model: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			case_material: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			case_size: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			strap_size: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			gender: {
				type: DataTypes.STRING(1),
				allowNull: true,
			},
			water_resistance: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			release_date: {
				type: DataTypes.STRING(14),
				allowNull: true,
			},
			sold: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			base_price: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			rating: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			thumbnail: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			slider: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			created_at: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			created_by: {
				type: DataTypes.STRING(14),
				allowNull: true,
			},
			updated_at: {
				type: DataTypes.STRING(14),
				allowNull: true,
			},
			updated_by: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			del_flag: {
				type: DataTypes.STRING(1),
				allowNull: false,
				defaultValue: '0',
			},
			category_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			brand_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			movement_type_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
		},
		{
			tableName: 'watches',
		}
	);

	watch.associate = (models) => {
		watch.belongsTo(models.category, {
			foreignKey: 'category_id',
			as: 'category',
		});

		watch.belongsTo(models.brand, {
			foreignKey: 'brand_id',
			as: 'brand',
		});

		watch.belongsTo(models.movementType, {
			foreignKey: 'movement_type_id',
			as: 'movementType',
		});

		watch.hasMany(models.watchVariant, {
			foreignKey: 'watch_id',
			as: 'variants',
		});

		watch.hasMany(models.orderDetail, {
			foreignKey: 'watch_id',
			as: 'orderDetails',
		});

		watch.hasMany(models.review, {
			foreignKey: 'watch_id',
			as: 'reviews',
		});
	};

	return watch;
};
