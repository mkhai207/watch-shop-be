module.exports = (sequelize, DataTypes) => {
	const cartItem = sequelize.define(
		'cartItem',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			cart_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			variant_id: {
				type: DataTypes.BIGINT,
				allowNull: true, // có thể null nếu không chọn biến thể
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			unit_price: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			total_price: {
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
			tableName: 'cart_items',
		}
	);

	cartItem.associate = (models) => {
		cartItem.belongsTo(models.cart, {
			foreignKey: 'cart_id',
			as: 'cart',
		});

		cartItem.belongsTo(models.watchVariant, {
			foreignKey: 'variant_id',
			as: 'variant',
		});
	};

	return cartItem;
};
