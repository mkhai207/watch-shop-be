module.exports = (sequelize, DataTypes) => {
	const discount = sequelize.define(
		'discount',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			code: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			min_order_value: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			max_discount_amount: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			discount_type: {
				type: DataTypes.STRING(1), // 0: fixed, 1: percentage
				allowNull: true,
			},
			discount_value: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			effective_date: {
				type: DataTypes.STRING(14),
				allowNull: true,
			},
			valid_until: {
				type: DataTypes.STRING(14),
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
			tableName: 'discounts',
		}
	);

	return discount;
};
