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
				allowNull: true,
			},
			color_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			strap_material_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			stock_quantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			price: {
				type: DataTypes.DOUBLE,
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
