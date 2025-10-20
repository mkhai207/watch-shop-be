module.exports = (sequelize, DataTypes) => {
	const userInteraction = sequelize.define(
		'userInteraction',
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
			interaction_type: {
				type: DataTypes.STRING(20),
				allowNull: false,
				comment: 'view, cart_add, purchase',
			},
			score: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: '1: view, 3: cart_add, 6: purchase',
			},
			session_id: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			created_at: {
				type: DataTypes.STRING(14),
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.STRING(14),
				allowNull: false,
			},
			del_flag: {
				type: DataTypes.STRING(1),
				allowNull: false,
				defaultValue: '0',
			},
		},
		{
			tableName: 'user_interactions',
			timestamps: false,
		}
	);

	userInteraction.associate = (models) => {
		userInteraction.belongsTo(models.user, {
			foreignKey: 'user_id',
			as: 'user',
		});

		userInteraction.belongsTo(models.watch, {
			foreignKey: 'watch_id',
			as: 'watch',
		});
	};

	return userInteraction;
};
