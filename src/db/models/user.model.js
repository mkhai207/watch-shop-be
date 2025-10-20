module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define(
		'user',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			code: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			username: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			phone_number: {
				type: DataTypes.STRING(15),
				allowNull: true,
			},
			first_name: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			last_name: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			// ML feature fields
			age_group: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: '18-25, 26-35, 36-45, 46+',
			},
			gender_preference: {
				type: DataTypes.STRING(1),
				allowNull: true,
				comment: 'M, F, U',
			},
			price_range_preference: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: 'budget, mid, premium, luxury',
			},
			brand_preferences: {
				type: DataTypes.JSONB,
				allowNull: true,
				comment: 'JSON array of brand IDs',
			},
			category_preferences: {
				type: DataTypes.JSONB,
				allowNull: true,
				comment: 'JSON array of category IDs',
			},
			style_preferences: {
				type: DataTypes.JSONB,
				allowNull: true,
				comment: 'JSON array of style strings',
			},
			gender: {
				type: DataTypes.STRING(1), // 0: Nam, 1: Nữ, 2: Khác
				allowNull: true,
			},
			date_of_birth: {
				type: DataTypes.STRING(8), // dạng yyyymmdd
				allowNull: true,
			},
			address: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			status: {
				type: DataTypes.STRING(1), // 0: Hoạt động, 1: Không hoạt động
				allowNull: false,
				defaultValue: '0',
			},
			created_at: {
				type: DataTypes.STRING(14),
				allowNull: false,
			},
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			updated_at: {
				type: DataTypes.STRING(14),
				allowNull: true,
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			del_flag: {
				type: DataTypes.STRING(1),
				allowNull: false,
				defaultValue: '0',
			},
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			tableName: 'users',
		}
	);

	user.associate = (models) => {
		user.belongsTo(models.role, {
			foreignKey: 'role_id',
			as: 'role',
			onDelete: 'CASCADE',
		});
		user.hasMany(models.address, {
			foreignKey: 'user_id',
			as: 'addresses',
		});
		user.hasMany(models.order, {
			foreignKey: 'user_id',
			as: 'orders',
		});
	};

	return user;
};
