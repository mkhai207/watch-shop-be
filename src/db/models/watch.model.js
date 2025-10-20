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
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: true,
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
			// ML feature fields
			price_tier: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: 'budget, mid, premium, luxury',
			},
			gender_target: {
				type: DataTypes.STRING(1),
				allowNull: true,
				comment: 'M, F, U',
			},
			size_category: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: 'small, medium, large',
			},
			style_tags: {
				type: DataTypes.JSONB,
				allowNull: true,
				comment: 'JSON array of style tags',
			},
			material_tags: {
				type: DataTypes.JSONB,
				allowNull: true,
				comment: 'JSON array of material tags',
			},
			color_tags: {
				type: DataTypes.JSONB,
				allowNull: true,
				comment: 'JSON array of color tags',
			},
			movement_type_tags: {
				type: DataTypes.JSONB,
				allowNull: true,
				comment: 'JSON array of movement type tags',
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
				allowNull: true,
				defaultValue: 0,
			},
			base_price: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			rating: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
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
				type: DataTypes.STRING(14),
				allowNull: true,
			},
			created_by: {
				type: DataTypes.BIGINT,
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
				allowNull: true,
				defaultValue: '0',
			},
			category_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			brand_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			movement_type_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
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
