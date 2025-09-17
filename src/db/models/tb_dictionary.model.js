module.exports = (sequelize, DataTypes) => {
	const tbDictionary = sequelize.define(
		'tbDictionary',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			col_nm: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			col_val: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			content: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			lang: {
				type: DataTypes.STRING(2),
				allowNull: true,
			},
			note: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			tableName: 'tb_dictionarys',
		}
	);

	return tbDictionary;
};
