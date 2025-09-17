module.exports = (sequelize, DataTypes) => {
	const watchVariant = sequelize.define(
		'watchVariant',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			watch_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			color_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			strap_material_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			stock_quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			price: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			created_at: {
				type: DataTypes.STRING(14),
				allowNull: false,
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
				allowNull: false,
				defaultValue: '0',
			},
		},
		{
			tableName: 'watch_variants',
		}
	);

	watchVariant.associate = (models) => {
		watchVariant.belongsTo(models.watch, {
			foreignKey: 'watch_id',
			as: 'watch',
		});

		watchVariant.belongsTo(models.color, {
			foreignKey: 'color_id',
			as: 'color',
		});

		watchVariant.belongsTo(models.strapMaterial, {
			foreignKey: 'strap_material_id',
			as: 'strapMaterial',
		});

		watchVariant.hasMany(models.orderDetail, {
			foreignKey: 'variant_id',
			as: 'orderDetails',
		});

		watchVariant.hasMany(models.cartItem, {
			foreignKey: 'variant_id',
			as: 'cartItems',
		});
	};

	return watchVariant;
};
