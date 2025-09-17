module.exports = (sequelize, DataTypes) => {
	const token = sequelize.define(
		'token',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			owner_type: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			token_type: {
				type: DataTypes.STRING(1), // phân loại: access, refresh, reset...
				allowNull: false,
			},
			token_value: {
				type: DataTypes.STRING(512),
				allowNull: false,
			},
			device_info: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			ip_address: {
				type: DataTypes.STRING(45), // IPv4 hoặc IPv6
				allowNull: true,
			},
			is_active: {
				type: DataTypes.STRING(1), // 0: inactive, 1: active
				allowNull: false,
				defaultValue: '1',
			},
			expires_at: {
				type: DataTypes.STRING(14),
				allowNull: false,
			},
			revoked_at: {
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
				type: DataTypes.DATE,
				allowNull: true,
			},
			updated_by: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
		},
		{
			tableName: 'tokens',
		}
	);

	token.associate = (models) => {
		token.belongsTo(models.user, {
			foreignKey: 'user_id',
			as: 'user',
			onDelete: 'CASCADE',
		});
	};

	return token;
};
