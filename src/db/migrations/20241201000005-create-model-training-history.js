'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('model_training_history', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT,
			},
			model_type: {
				type: Sequelize.STRING(50),
				allowNull: false,
				comment: 'collaborative, content_based, hybrid',
			},
			algorithm_version: {
				type: Sequelize.STRING(20),
				allowNull: false,
				comment: 'Version of the algorithm used',
			},
			training_data_size: {
				type: Sequelize.INTEGER,
				allowNull: false,
				comment: 'Number of training samples used',
			},
			model_accuracy: {
				type: Sequelize.DECIMAL(10, 6),
				allowNull: true,
				comment: 'Model accuracy score',
			},
			training_duration_seconds: {
				type: Sequelize.INTEGER,
				allowNull: true,
				comment: 'Training time in seconds',
			},
			model_file_path: {
				type: Sequelize.STRING(255),
				allowNull: true,
				comment: 'Path to saved model file',
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		// Add indexes for better performance
		await queryInterface.addIndex('model_training_history', ['model_type']);
		await queryInterface.addIndex('model_training_history', [
			'algorithm_version',
		]);
		await queryInterface.addIndex('model_training_history', ['created_at']);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('model_training_history');
	},
};
