module.exports = (sequelize, DataTypes) => {
	const strapMaterial = sequelize.define(
		'strapMaterial',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			code: {
				type: DataTypes.STRING(10),
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
			extra_money: {
				type: DataTypes.DOUBLE,
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
			tableName: 'strap_materials',
		}
	);

	strapMaterial.associate = (models) => {
		strapMaterial.hasMany(models.watchVariant, {
			foreignKey: 'strap_material_id',
			as: 'variants',
		});
	};

	return strapMaterial;
};
