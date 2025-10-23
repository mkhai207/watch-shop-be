const axios = require('axios');
const config = require('../config/config');

class AIRecommendationService {
	constructor() {
		this.aiServerUrl = config.aiServerUrl || 'http://localhost:5001';
		this.timeout = 5000; // 5 seconds timeout
	}

	/**
	 * Get recommendations from AI server
	 * @param {number} userId - User ID
	 * @param {number} limit - Number of recommendations
	 * @param {boolean} excludeInteractions - Whether to exclude user's previous interactions
	 * @returns {Promise<Array>} Recommendations
	 */
	async getRecommendations(userId, limit = 10, excludeInteractions = true) {
		try {
			const response = await axios.get(
				`${this.aiServerUrl}/recommendations/${userId}`,
				{
					params: {
						limit,
						exclude_interactions: excludeInteractions,
					},
					timeout: this.timeout,
				}
			);

			return response.data;
		} catch (error) {
			console.error('AI Recommendation Service Error:', error.message);

			// Fallback to popular items if AI server is down
			return await this.getFallbackRecommendations(limit);
		}
	}

	/**
	 * Get similar items from AI server
	 * @param {number} watchId - Watch ID
	 * @param {number} limit - Number of similar items
	 * @returns {Promise<Array>} Similar items
	 */
	async getSimilarItems(watchId, limit = 10) {
		try {
			const response = await axios.get(
				`${this.aiServerUrl}/similar/${watchId}`,
				{
					params: { limit },
					timeout: this.timeout,
				}
			);

			return response.data;
		} catch (error) {
			console.error('AI Similar Items Service Error:', error.message);

			// Fallback to same category items
			return await this.getFallbackSimilarItems(watchId, limit);
		}
	}

	/**
	 * Check AI server health
	 * @returns {Promise<Object>} Health status
	 */
	async checkHealth() {
		try {
			const response = await axios.get(`${this.aiServerUrl}/health`, {
				timeout: this.timeout,
			});

			return response.data;
		} catch (error) {
			return {
				status: 'unhealthy',
				error: error.message,
			};
		}
	}

	/**
	 * Get AI server statistics
	 * @returns {Promise<Object>} Server stats
	 */
	async getStats() {
		try {
			const response = await axios.get(`${this.aiServerUrl}/stats`, {
				timeout: this.timeout,
			});

			return response.data;
		} catch (error) {
			return {
				error: error.message,
			};
		}
	}

	/**
	 * Fallback recommendations when AI server is down
	 * @param {number} limit - Number of recommendations
	 * @returns {Promise<Array>} Fallback recommendations
	 */
	async getFallbackRecommendations(limit) {
		const { watch } = require('../db/models');

		try {
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

			return {
				recommendations: popularItems.map((item) => ({
					watch_id: item.id,
					score: 0.5, // Default score for fallback
					name: item.name,
					base_price: item.base_price,
					rating: item.rating,
					brand: item.brand,
					category: item.category,
				})),
				fallback: true,
				message: 'AI server unavailable, showing popular items',
			};
		} catch (error) {
			console.error('Fallback recommendations error:', error);
			return {
				recommendations: [],
				error: 'Unable to get recommendations',
			};
		}
	}

	/**
	 * Fallback similar items when AI server is down
	 * @param {number} watchId - Watch ID
	 * @param {number} limit - Number of similar items
	 * @returns {Promise<Array>} Fallback similar items
	 */
	async getFallbackSimilarItems(watchId, limit) {
		const { watch } = require('../db/models');

		try {
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
				return {
					similar_items: [],
					error: 'Watch not found',
				};
			}

			// Find similar watches in the same category and brand
			const similarItems = await watch.findAll({
				where: {
					id: {
						[require('sequelize').Op.ne]: watchId,
					},
					[require('sequelize').Op.or]: [
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

			return {
				similar_items: similarItems.map((item) => ({
					watch_id: item.id,
					similarity: 0.7, // Default similarity score
					name: item.name,
					base_price: item.base_price,
					rating: item.rating,
					brand: item.brand,
					category: item.category,
				})),
				fallback: true,
				message:
					'AI server unavailable, showing similar items by category/brand',
			};
		} catch (error) {
			console.error('Fallback similar items error:', error);
			return {
				similar_items: [],
				error: 'Unable to get similar items',
			};
		}
	}
}

module.exports = new AIRecommendationService();
