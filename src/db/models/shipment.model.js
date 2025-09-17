module.exports = (sequelize, DataTypes) => {
	const shipment = sequelize.define(
		'shipment',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			order_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			carrier: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			tracking_code: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			status: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			estimated_delivery: {
				type: DataTypes.STRING(14),
				allowNull: true,
			},
			delivered_at: {
				type: DataTypes.STRING(14),
				allowNull: true,
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
			tableName: 'shipments',
		}
	);

	shipment.associate = (models) => {
		shipment.belongsTo(models.order, {
			foreignKey: 'order_id',
			as: 'order',
		});
	};

	return shipment;
};
