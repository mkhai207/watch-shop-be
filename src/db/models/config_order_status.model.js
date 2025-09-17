module.exports = (sequelize, DataTypes) => {
	const configOrderStatus = sequelize.define(
		'configOrderStatus',
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
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			hex_code: {
				type: DataTypes.STRING(7),
				allowNull: true,
			},
			color: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			sort_order: {
				type: DataTypes.INTEGER,
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
			tableName: 'config_order_status',
		}
	);

	configOrderStatus.associate = (models) => {
		configOrderStatus.hasMany(models.order, {
			foreignKey: 'status_id',
			as: 'orders',
		});
	};

	return configOrderStatus;
};
