module.exports = (sequelize, DataTypes) => {
	const role = sequelize.define(
		'role',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			code: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			description: {
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
			tableName: 'roles',
		}
	);

	role.associate = (models) => {
		role.hasMany(models.user, { foreignKey: 'role_id', as: 'users' });

		role.hasMany(models.permissionRole, { foreignKey: 'role_id' });

		role.belongsToMany(models.permission, {
			through: models.permissionRole,
			foreignKey: 'role_id',
			otherKey: 'permission_id',
			as: 'permissions',
		});
	};

	return role;
};
