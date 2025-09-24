const AccessControl = require('accesscontrol');

const ac = new AccessControl();

const roleIds = {
	ADMIN: '1',
	USER: '2',
};

const resources = {
	USERINFO: 'user',
	ROLE: 'role',
	BRAND: 'brand',
	CATEGORY: 'category',
	ADDRESS: 'address',
	MOVEMENT_TYPE: 'movementType',
	COLOR: 'color',
	STRAP_MATERIAL: 'strapMaterial',
	WATCH: 'watch',
	WATCH_VARIANT: 'watchVariant',
	CART: 'cart',
};

const grantsObject = {
	[roleIds.ADMIN]: {
		[resources.USERINFO]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.ROLE]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.BRAND]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.CATEGORY]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.ADDRESS]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.MOVEMENT_TYPE]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.COLOR]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.STRAP_MATERIAL]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.WATCH]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.WATCH_VARIANT]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.CART]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
	},
	[roleIds.USER]: {
		[resources.USERINFO]: {
			'create:own': ['*'],
			'read:own': ['*'],
			'update:own': ['*'],
			'delete:own': ['*'],
		},
		[resources.BRAND]: {
			'read:any': ['*'],
		},
		[resources.CATEGORY]: {
			'read:any': ['*'],
		},
		[resources.ADDRESS]: {
			'create:own': ['*'],
			'read:own': ['*'],
			'update:own': ['*'],
			'delete:own': ['*'],
		},
		[resources.MOVEMENT_TYPE]: {
			'read:any': ['*'],
		},
		[resources.COLOR]: {
			'read:any': ['*'],
		},
		[resources.STRAP_MATERIAL]: {
			'read:any': ['*'],
		},
		[resources.WATCH]: {
			'read:any': ['*'],
		},
		[resources.WATCH_VARIANT]: {
			'read:any': ['*'],
		},
		[resources.CART]: {
			'create:own': ['*'],
			'read:own': ['*'],
			'update:own': ['*'],
			'delete:own': ['*'],
		},
	},
};

const roles = (function () {
	ac.setGrants(grantsObject);
	return ac;
})();

module.exports = {
	roles,
	resources,
};
