module.exports = (sequelize, DataTypes) => {
	const brand = sequelize.define(
		'brand',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			logo_url: {
				type: DataTypes.STRING(255),
				allowNull: true,
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
			tableName: 'brands',
		}
	);

	brand.associate = (models) => {
		brand.hasMany(models.watch, { foreignKey: 'brand_id', as: 'watches' });
	};

	return brand;
};
