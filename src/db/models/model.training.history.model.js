module.exports = (sequelize, DataTypes) => {
	const modelTrainingHistory = sequelize.define(
		'modelTrainingHistory',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			model_type: {
				type: DataTypes.STRING(50),
				allowNull: false,
				comment: 'collaborative, content_based, hybrid',
			},
			algorithm_version: {
				type: DataTypes.STRING(20),
				allowNull: false,
				comment: 'Version of the algorithm used',
			},
			training_data_size: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: 'Number of training samples used',
			},
			model_accuracy: {
				type: DataTypes.DECIMAL(10, 6),
				allowNull: true,
				comment: 'Model accuracy score',
			},
			training_duration_seconds: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: 'Training time in seconds',
			},
			model_file_path: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: 'Path to saved model file',
			},
			created_at: {
				type: DataTypes.STRING(14),
				allowNull: false,
			},
		},
		{
			tableName: 'model_training_history',
			timestamps: false,
		}
	);

	return modelTrainingHistory;
};
