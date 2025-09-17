module.exports = (sequelize, DataTypes) => {
	const cart = sequelize.define(
		'cart',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: true, // cho phép null nếu là khách chưa đăng nhập
			},
			session_id: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			status: {
				type: DataTypes.STRING(20), // active, checked_out, abandoned
				allowNull: false,
				defaultValue: 'active',
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
			tableName: 'carts',
		}
	);

	cart.associate = (models) => {
		cart.belongsTo(models.user, {
			foreignKey: 'user_id',
			as: 'user',
		});

		cart.hasMany(models.cartItem, {
			foreignKey: 'cart_id',
			as: 'items',
		});
	};

	return cart;
};
