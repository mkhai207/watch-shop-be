module.exports = (sequelize, DataTypes) => {
	const permission = sequelize.define(
		'permission',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			api_path: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			method: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			module: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING(255),
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
			tableName: 'permissions',
		}
	);

	permission.associate = (models) => {
		permission.hasMany(models.permissionRole, {
			foreignKey: 'permission_id',
		});

		permission.belongsToMany(models.role, {
			through: models.permissionRole,
			foreignKey: 'permission_id',
			otherKey: 'role_id',
			as: 'roles',
		});
	};

	return permission;
};
