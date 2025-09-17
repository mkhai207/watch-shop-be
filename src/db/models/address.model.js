module.exports = (sequelize, DataTypes) => {
	const address = sequelize.define(
		'address',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			city: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			district: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			is_default: {
				type: DataTypes.STRING(1), // 1: mặc định
				allowNull: false,
				defaultValue: '0',
			},
			phone_number: {
				type: DataTypes.STRING(15),
				allowNull: true,
			},
			recipient_name: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			street: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			ward: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			created_at: {
				type: DataTypes.STRING(14),
				allowNull: false,
			},
			created_by: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			updated_at: {
				type: DataTypes.STRING(14),
				allowNull: true,
			},
			updated_by: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			del_flag: {
				type: DataTypes.STRING(1), // 1: đã xóa, 0: bình thường
				allowNull: false,
				defaultValue: '0',
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
		},
		{
			tableName: 'addresses',
		}
	);

	address.associate = (models) => {
		address.belongsTo(models.user, {
			foreignKey: 'user_id',
			as: 'user',
			onDelete: 'CASCADE',
		});
	};

	return address;
};
