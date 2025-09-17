module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('tb_dictionarys', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			col_nm: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			col_val: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			content: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			lang: {
				type: Sequelize.STRING(2),
				allowNull: true,
			},
			note: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
		}),
	down: (queryInterface /* , Sequelize */) =>
		queryInterface.dropTable('tb_dictionarys'),
};
