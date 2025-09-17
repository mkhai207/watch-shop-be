module.exports = (sequelize, DataTypes) => {
	const color = sequelize.define(
		'color',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			hex_code: {
				type: DataTypes.STRING(7),
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
			tableName: 'colors',
		}
	);

	color.associate = (models) => {
		color.hasMany(models.watchVariant, {
			foreignKey: 'color_id',
			as: 'variants',
		});
	};

	return color;
};
