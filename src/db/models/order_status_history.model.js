module.exports = (sequelize, DataTypes) => {
	const orderStatusHistory = sequelize.define(
		'orderStatusHistory',
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
			status_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
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
			tableName: 'order_status_history',
		}
	);

	orderStatusHistory.associate = (models) => {
		orderStatusHistory.belongsTo(models.order, {
			foreignKey: 'order_id',
			as: 'order',
		});

		orderStatusHistory.belongsTo(models.configOrderStatus, {
			foreignKey: 'status_id',
			as: 'status',
		});
	};

	return orderStatusHistory;
};
