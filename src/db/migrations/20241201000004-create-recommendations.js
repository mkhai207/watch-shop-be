'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('recommendations', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT,
			},
			user_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			watch_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'watches',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			recommendation_score: {
				type: Sequelize.DECIMAL(10, 6),
				allowNull: false,
				comment: 'Score from 0.0 to 1.0',
			},
			recommendation_type: {
				type: Sequelize.STRING(20),
				allowNull: false,
				comment: 'collaborative, content_based, hybrid',
			},
			algorithm_version: {
				type: Sequelize.STRING(20),
				allowNull: false,
				comment: 'Version of the algorithm used',
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			expires_at: {
				allowNull: false,
				type: Sequelize.DATE,
				comment: 'When this recommendation expires',
			},
		});

		// Add indexes for better performance
		await queryInterface.addIndex('recommendations', [
			'user_id',
			'recommendation_score',
		]);
		await queryInterface.addIndex('recommendations', [
			'user_id',
			'recommendation_type',
		]);
		await queryInterface.addIndex('recommendations', ['expires_at']);
		await queryInterface.addIndex('recommendations', ['algorithm_version']);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('recommendations');
	},
};
