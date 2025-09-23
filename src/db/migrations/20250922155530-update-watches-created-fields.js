module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn('watches', 'created_at', {
			type: Sequelize.STRING(14),
			allowNull: false,
		});

		await queryInterface.changeColumn('watches', 'created_by', {
			type: Sequelize.BIGINT,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn('watches', 'created_at', {
			type: Sequelize.INTEGER,
			allowNull: false,
		});

		await queryInterface.changeColumn('watches', 'created_by', {
			type: Sequelize.STRING(14),
			allowNull: true,
		});
	},
};
