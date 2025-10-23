const { userInteraction } = require('../db/models');
const { Op } = require('sequelize');

class RecommendationService {
	/**
	 * Record user interaction
	 * @param {Object} interactionData - Interaction data
	 * @returns {Promise<Object>} Created interaction
	 */
	async recordInteraction(interactionData) {
		const { user_id, watch_id, interaction_type, session_id } =
			interactionData;

		// Define score mapping
		const scoreMapping = {
			view: 1,
			cart_add: 3,
			purchase: 6,
		};

		const score = scoreMapping[interaction_type] || 1;

		// Check if interaction already exists for this user-item pair
		const existingInteraction = await userInteraction.findOne({
			where: {
				user_id,
				watch_id,
				interaction_type,
				del_flag: '0',
			},
		});

		if (existingInteraction) {
			// Update existing interaction
			existingInteraction.score = Math.max(
				existingInteraction.score,
				score
			);
			existingInteraction.updated_at = new Date()
				.toISOString()
				.replace(/[-:]/g, '')
				.replace('T', '')
				.substring(0, 14);
			await existingInteraction.save();
			return existingInteraction;
		}

		// Create new interaction
		const interaction = await userInteraction.create({
			user_id,
			watch_id,
			interaction_type,
			score,
			session_id,
			created_at: new Date()
				.toISOString()
				.replace(/[-:]/g, '')
				.replace('T', '')
				.substring(0, 14),
			updated_at: new Date()
				.toISOString()
				.replace(/[-:]/g, '')
				.replace('T', '')
				.substring(0, 14),
			del_flag: '0',
		});

		return interaction;
	}

	/**
	 * Get recommendations for a user (DEPRECATED - Use AI service instead)
	 * @param {number} userId - User ID
	 * @param {number} limit - Number of recommendations
	 * @param {string} type - Recommendation type (collaborative, content_based, hybrid)
	 * @returns {Promise<Array>} Recommendations
	 */
	async getRecommendations(userId, limit = 10, type = 'hybrid') {
		// This method is deprecated - use AI service for real-time recommendations
		console.warn(
			'getRecommendations is deprecated. Use AI service for real-time recommendations.'
		);
		return await this.getPopularItems(limit);
	}

	/**
	 * Get popular items as fallback
	 * @param {number} limit - Number of items
	 * @returns {Promise<Array>} Popular items
	 */
	async getPopularItems(limit = 10) {
		const { watch } = require('../db/models');

		const popularItems = await watch.findAll({
			where: {
				status: true,
				del_flag: '0',
			},
			include: [
				{
					model: require('../db/models').brand,
					as: 'brand',
				},
				{
					model: require('../db/models').category,
					as: 'category',
				},
			],
			order: [
				['sold', 'DESC'],
				['rating', 'DESC'],
			],
			limit: limit,
		});

		return popularItems.map((item) => ({
			watch_id: item.id,
			score: 0.5, // Default score for popular items
			watch: item,
		}));
	}

	/**
	 * Get user interaction history
	 * @param {number} userId - User ID
	 * @param {number} limit - Number of interactions
	 * @returns {Promise<Array>} User interactions
	 */
	async getUserInteractions(userId, limit = 20) {
		const interactions = await userInteraction.findAll({
			where: {
				user_id: userId,
				del_flag: '0',
			},
			include: [
				{
					model: require('../db/models').watch,
					as: 'watch',
					include: [
						{
							model: require('../db/models').brand,
							as: 'brand',
						},
						{
							model: require('../db/models').category,
							as: 'category',
						},
					],
				},
			],
			order: [['created_at', 'DESC']],
			limit: limit,
		});

		return interactions;
	}

	/**
	 * Get similar items based on content
	 * @param {number} watchId - Watch ID
	 * @param {number} limit - Number of similar items
	 * @returns {Promise<Array>} Similar items
	 */
	async getSimilarItems(watchId, limit = 10) {
		const { watch } = require('../db/models');

		// Get the target watch
		const targetWatch = await watch.findByPk(watchId, {
			include: [
				{
					model: require('../db/models').brand,
					as: 'brand',
				},
				{
					model: require('../db/models').category,
					as: 'category',
				},
			],
		});

		if (!targetWatch) {
			return [];
		}

		// Find similar watches in the same category and brand
		const similarItems = await watch.findAll({
			where: {
				id: {
					[Op.ne]: watchId,
				},
				[Op.or]: [
					{ category_id: targetWatch.category_id },
					{ brand_id: targetWatch.brand_id },
				],
				status: true,
				del_flag: '0',
			},
			include: [
				{
					model: require('../db/models').brand,
					as: 'brand',
				},
				{
					model: require('../db/models').category,
					as: 'category',
				},
			],
			order: [
				['rating', 'DESC'],
				['sold', 'DESC'],
			],
			limit: limit,
		});

		return similarItems.map((item) => ({
			watch_id: item.id,
			score: 0.7, // Default similarity score
			watch: item,
		}));
	}

	/**
	 * Update user features
	 * @param {number} userId - User ID
	 * @param {Object} features - User features
	 * @returns {Promise<Object>} Updated user features
	 */
	async updateUserFeatures(userId, features) {
		// Update features directly on users table
		const { user } = require('../db/models');
		const userRecord = await user.findByPk(userId);
		if (!userRecord) return null;

		// Normalize potential JSON strings to arrays for JSONB columns
		const normalizeArray = (v) => {
			if (v === undefined || v === null) return v;
			if (Array.isArray(v)) return v;
			try {
				const parsed = JSON.parse(v);
				return Array.isArray(parsed) ? parsed : v;
			} catch (_) {
				return v;
			}
		};

		const updatePayload = { ...features };
		if ('brand_preferences' in updatePayload)
			updatePayload.brand_preferences = normalizeArray(
				updatePayload.brand_preferences
			);
		if ('category_preferences' in updatePayload)
			updatePayload.category_preferences = normalizeArray(
				updatePayload.category_preferences
			);
		if ('style_preferences' in updatePayload)
			updatePayload.style_preferences = normalizeArray(
				updatePayload.style_preferences
			);

		await userRecord.update(updatePayload);
		return userRecord;
	}

	/**
	 * Update item features
	 * @param {number} watchId - Watch ID
	 * @param {Object} features - Item features
	 * @returns {Promise<Object>} Updated item features
	 */
	async updateItemFeatures(watchId, features) {
		// Update features directly on watches table
		const { watch } = require('../db/models');
		const watchRecord = await watch.findByPk(watchId);
		if (!watchRecord) return null;

		const normalizeArray = (v) => {
			if (v === undefined || v === null) return v;
			if (Array.isArray(v)) return v;
			try {
				const parsed = JSON.parse(v);
				return Array.isArray(parsed) ? parsed : v;
			} catch (_) {
				return v;
			}
		};

		const updatePayload = { ...features };
		for (const key of [
			'style_tags',
			'material_tags',
			'color_tags',
			'movement_type_tags',
		]) {
			if (key in updatePayload) {
				updatePayload[key] = normalizeArray(updatePayload[key]);
			}
		}

		await watchRecord.update(updatePayload);
		return watchRecord;
	}

	/**
	 * Get recommendation statistics (Updated for AI server)
	 * @returns {Promise<Object>} Statistics
	 */
	async getRecommendationStats() {
		const totalInteractions = await userInteraction.count({
			where: { del_flag: '0' },
		});

		const uniqueUsers = await userInteraction.count({
			distinct: true,
			col: 'user_id',
			where: { del_flag: '0' },
		});

		const uniqueItems = await userInteraction.count({
			distinct: true,
			col: 'watch_id',
			where: { del_flag: '0' },
		});

		return {
			totalInteractions,
			uniqueUsers,
			uniqueItems,
			note: 'Recommendations now served by AI server in real-time',
		};
	}
}

module.exports = new RecommendationService();
