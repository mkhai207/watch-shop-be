module.exports = (sequelize, DataTypes) => {
	const review = sequelize.define(
		'review',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			rating: {
				type: DataTypes.FLOAT,
				allowNull: false, // Rating from 1 to 5
			},
			comment: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			image_url: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			order_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			watch_id: {
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
			tableName: 'reviews',
		}
	);

	review.associate = (models) => {
		review.belongsTo(models.user, {
			foreignKey: 'user_id',
			as: 'user',
		});
		review.belongsTo(models.order, {
			foreignKey: 'order_id',
			as: 'order',
		});
		review.belongsTo(models.watch, {
			foreignKey: 'watch_id',
			as: 'watch',
		});
	};

	return review;
};
