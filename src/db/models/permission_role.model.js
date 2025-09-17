module.exports = (sequelize, DataTypes) => {
	const permissionRole = sequelize.define(
		'permissionRole',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			role_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			permission_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
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
			tableName: 'permission_role',
		}
	);

	permissionRole.associate = (models) => {
		permissionRole.belongsTo(models.role, { foreignKey: 'role_id' });
		permissionRole.belongsTo(models.permission, {
			foreignKey: 'permission_id',
		});
	};

	return permissionRole;
};
