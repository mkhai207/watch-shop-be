module.exports = (sequelize, DataTypes) => {
	const category = sequelize.define(
		'category',
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
			image_url: {
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
			tableName: 'categorys',
		}
	);

	category.associate = (models) => {
		category.hasMany(models.watch, {
			foreignKey: 'category_id',
			as: 'watches',
		});
	};

	return category;
};
