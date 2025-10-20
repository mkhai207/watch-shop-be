module.exports = (sequelize, DataTypes) => {
	const recommendation = sequelize.define(
		'recommendation',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			watch_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			recommendation_score: {
				type: DataTypes.DECIMAL(10, 6),
				allowNull: false,
				comment: 'Score from 0.0 to 1.0',
			},
			recommendation_type: {
				type: DataTypes.STRING(20),
				allowNull: false,
				comment: 'collaborative, content_based, hybrid',
			},
			algorithm_version: {
				type: DataTypes.STRING(20),
				allowNull: false,
				comment: 'Version of the algorithm used',
			},
			created_at: {
				type: DataTypes.STRING(14),
				allowNull: false,
			},
			expires_at: {
				type: DataTypes.STRING(14),
				allowNull: false,
				comment: 'When this recommendation expires',
			},
		},
		{
			tableName: 'recommendations',
			timestamps: false,
		}
	);

	recommendation.associate = (models) => {
		recommendation.belongsTo(models.user, {
			foreignKey: 'user_id',
			as: 'user',
		});

		recommendation.belongsTo(models.watch, {
			foreignKey: 'watch_id',
			as: 'watch',
		});
	};

	return recommendation;
};
