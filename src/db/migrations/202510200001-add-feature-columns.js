'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		// Users: add preference fields
		await queryInterface.addColumn('users', 'age_group', {
			type: Sequelize.STRING(20),
			allowNull: true,
			comment: '18-25, 26-35, 36-45, 46+',
		});
		await queryInterface.addColumn('users', 'gender_preference', {
			type: Sequelize.STRING(1),
			allowNull: true,
			comment: 'M, F, U',
		});
		await queryInterface.addColumn('users', 'price_range_preference', {
			type: Sequelize.STRING(20),
			allowNull: true,
			comment: 'budget, mid, premium, luxury',
		});
		await queryInterface.addColumn('users', 'brand_preferences', {
			type: Sequelize.JSONB,
			allowNull: true,
			comment: 'JSON array of brand IDs',
		});
		await queryInterface.addColumn('users', 'category_preferences', {
			type: Sequelize.JSONB,
			allowNull: true,
			comment: 'JSON array of category IDs',
		});
		await queryInterface.addColumn('users', 'style_preferences', {
			type: Sequelize.JSONB,
			allowNull: true,
			comment: 'JSON array of style strings',
		});

		// Watches: add content fields
		await queryInterface.addColumn('watches', 'price_tier', {
			type: Sequelize.STRING(20),
			allowNull: true,
			comment: 'budget, mid, premium, luxury',
		});
		await queryInterface.addColumn('watches', 'gender_target', {
			type: Sequelize.STRING(1),
			allowNull: true,
			comment: 'M, F, U',
		});
		await queryInterface.addColumn('watches', 'size_category', {
			type: Sequelize.STRING(20),
			allowNull: true,
			comment: 'small, medium, large',
		});
		await queryInterface.addColumn('watches', 'style_tags', {
			type: Sequelize.JSONB,
			allowNull: true,
			comment: 'JSON array of style tags',
		});
		await queryInterface.addColumn('watches', 'material_tags', {
			type: Sequelize.JSONB,
			allowNull: true,
			comment: 'JSON array of material tags',
		});
		await queryInterface.addColumn('watches', 'color_tags', {
			type: Sequelize.JSONB,
			allowNull: true,
			comment: 'JSON array of color tags',
		});
		await queryInterface.addColumn('watches', 'movement_type_tags', {
			type: Sequelize.JSONB,
			allowNull: true,
			comment: 'JSON array of movement type tags',
		});
	},

	async down(queryInterface, Sequelize) {
		// Watches
		await queryInterface.removeColumn('watches', 'movement_type_tags');
		await queryInterface.removeColumn('watches', 'color_tags');
		await queryInterface.removeColumn('watches', 'material_tags');
		await queryInterface.removeColumn('watches', 'style_tags');
		await queryInterface.removeColumn('watches', 'size_category');
		await queryInterface.removeColumn('watches', 'gender_target');
		await queryInterface.removeColumn('watches', 'price_tier');

		// Users
		await queryInterface.removeColumn('users', 'style_preferences');
		await queryInterface.removeColumn('users', 'category_preferences');
		await queryInterface.removeColumn('users', 'brand_preferences');
		await queryInterface.removeColumn('users', 'price_range_preference');
		await queryInterface.removeColumn('users', 'gender_preference');
		await queryInterface.removeColumn('users', 'age_group');
	},
};
