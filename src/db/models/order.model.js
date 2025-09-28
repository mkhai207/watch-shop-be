module.exports = (sequelize, DataTypes) => {
	const order = sequelize.define(
		'order',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			code: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			total_amount: {
				type: DataTypes.DOUBLE, // tổng số tiền sau giảm giá
				allowNull: true,
			},
			discount_code: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			discount_amount: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			final_amount: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			current_status_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			// payment_status: {
			// 	type: DataTypes.STRING(1), // 0: chưa thanh toán, 1: đã thanh toán, 2: hoàn tiền
			// 	allowNull: true,
			// 	defaultValue: '0',
			// },
			// payment_method: {
			// 	type: DataTypes.STRING(50),
			// 	allowNull: true,
			// },
			shipping_address: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			shipping_fee: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			note: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			guess_name: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			guess_email: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			guess_phone: {
				type: DataTypes.STRING(15),
				allowNull: true,
			},
			created_at: {
				type: DataTypes.STRING(14),
				allowNull: true,
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
				type: DataTypes.STRING(1),
				allowNull: true,
				defaultValue: '0',
			},
		},
		{
			tableName: 'orders',
		}
	);

	order.associate = (models) => {
		order.belongsTo(models.user, {
			foreignKey: 'user_id',
			as: 'user',
		});

		order.belongsTo(models.configOrderStatus, {
			foreignKey: 'current_status_id',
			as: 'currentStatus',
		});

		order.hasMany(models.orderDetail, {
			foreignKey: 'order_id',
			as: 'details',
		});

		order.hasMany(models.payment, {
			foreignKey: 'order_id',
			as: 'payment',
		});

		order.hasOne(models.shipment, {
			foreignKey: 'order_id',
			as: 'shipment',
		});

		order.hasMany(models.review, {
			foreignKey: 'order_id',
			as: 'reviews',
		});

		order.hasMany(models.orderStatusHistory, {
			foreignKey: 'order_id',
			as: 'statusHistory',
		});
	};
	return order;
};
