module.exports = (sequelize, DataTypes) => {
	const orderDetail = sequelize.define(
		'orderDetail',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			order_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			variant_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			unit_price: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			total_price: {
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
			tableName: 'order_details',
		}
	);

	orderDetail.associate = (models) => {
		orderDetail.belongsTo(models.order, {
			foreignKey: 'order_id',
			as: 'order',
		});

		orderDetail.belongsTo(models.watchVariant, {
			foreignKey: 'variant_id',
			as: 'variant',
		});
	};

	return orderDetail;
};
