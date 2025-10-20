'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('user_interactions', {
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
			interaction_type: {
				type: Sequelize.STRING(20),
				allowNull: false,
				comment: 'view, cart_add, purchase',
			},
			score: {
				type: Sequelize.INTEGER,
				allowNull: false,
				comment: '1: view, 3: cart_add, 6: purchase',
			},
			session_id: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			del_flag: {
				type: Sequelize.STRING(1),
				allowNull: false,
				defaultValue: '0',
			},
		});

		// Add indexes for better performance
		await queryInterface.addIndex('user_interactions', [
			'user_id',
			'watch_id',
		]);
		await queryInterface.addIndex('user_interactions', [
			'interaction_type',
		]);
		await queryInterface.addIndex('user_interactions', ['created_at']);
		await queryInterface.addIndex('user_interactions', [
			'user_id',
			'created_at',
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('user_interactions');
	},
};
