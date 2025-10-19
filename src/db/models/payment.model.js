module.exports = (sequelize, DataTypes) => {
	const payment = sequelize.define(
		'payment',
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
			transaction_code: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			gateway_trans_no: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			trans_date: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			amount: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			method: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			status: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			type: {
				type: DataTypes.STRING(1), // 0: Thanh toán, 1: Hoàn tiền
				allowNull: true,
				defaultValue: '0',
			},
			note: {
				type: DataTypes.STRING(255),
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
			tableName: 'payments',
		}
	);

	payment.associate = (models) => {
		payment.belongsTo(models.order, {
			foreignKey: 'order_id',
			as: 'order',
		});
	};

	return payment;
};
