-- SQL Dump for API Permissions
-- Generated based on codebase analysis

-- TRUNCATE TABLE public.permissions CASCADE;
-- TRUNCATE TABLE public.permission_role CASCADE;

-- 1. Insert into permissions
-- Format: (id, api_path, method, module, name, created_at)

-- Auth
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (1, '/v1/auth/register', 'POST', 'Auth', 'Register', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (2, '/v1/auth/login', 'POST', 'Auth', 'Login', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (3, '/v1/auth/forgot-password', 'POST', 'Auth', 'Forgot Password', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (4, '/v1/auth/reset-password', 'POST', 'Auth', 'Reset Password', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (5, '/v1/auth/refresh', 'GET', 'Auth', 'Refresh Token', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (6, '/v1/auth/me', 'GET', 'Auth', 'Get Current User', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (7, '/v1/auth/google', 'POST', 'Auth', 'Login Google', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (8, '/v1/auth/change-password', 'PUT', 'Auth', 'Change Password', '20250101000000');

-- Users
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (9, '/v1/users', 'GET', 'User', 'Get Users', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (10, '/v1/users/:userId', 'GET', 'User', 'Get User', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (11, '/v1/users/:userId', 'PUT', 'User', 'Update User', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (12, '/v1/users/:userId', 'DELETE', 'User', 'Delete User', '20250101000000');

-- Roles
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (13, '/v1/roles', 'GET', 'Role', 'Get Roles', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (14, '/v1/roles', 'POST', 'Role', 'Create Role', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (15, '/v1/roles/:roleId', 'GET', 'Role', 'Get Role', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (16, '/v1/roles/:roleId', 'PUT', 'Role', 'Update Role', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (17, '/v1/roles/:roleId', 'DELETE', 'Role', 'Delete Role', '20250101000000');

-- Docs
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (18, '/v1/docs', 'GET', 'Docs', 'Get Documentation', '20250101000000');

-- Brands
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (19, '/v1/brands', 'GET', 'Brand', 'Get Brands', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (20, '/v1/brands', 'POST', 'Brand', 'Create Brand', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (21, '/v1/brands/:brandId', 'GET', 'Brand', 'Get Brand', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (22, '/v1/brands/:brandId', 'PUT', 'Brand', 'Update Brand', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (23, '/v1/brands/:brandId', 'DELETE', 'Brand', 'Delete Brand', '20250101000000');

-- Categories (spelled categorys in route)
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (24, '/v1/categorys', 'GET', 'Category', 'Get Categories', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (25, '/v1/categorys', 'POST', 'Category', 'Create Category', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (26, '/v1/categorys/:categoryId', 'GET', 'Category', 'Get Category', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (27, '/v1/categorys/:categoryId', 'PUT', 'Category', 'Update Category', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (28, '/v1/categorys/:categoryId', 'DELETE', 'Category', 'Delete Category', '20250101000000');

-- Uploads
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (29, '/v1/uploads/image', 'POST', 'Upload', 'Upload Image', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (30, '/v1/uploads/images', 'POST', 'Upload', 'Upload Images', '20250101000000');

-- Addresses
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (31, '/v1/addresses', 'GET', 'Address', 'Get Addresses', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (32, '/v1/addresses', 'POST', 'Address', 'Create Address', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (33, '/v1/addresses/default', 'GET', 'Address', 'Get Default Address', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (34, '/v1/addresses/:addressId', 'GET', 'Address', 'Get Address', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (35, '/v1/addresses/:addressId', 'PUT', 'Address', 'Update Address', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (36, '/v1/addresses/:addressId', 'DELETE', 'Address', 'Delete Address', '20250101000000');

-- Movement Type
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (37, '/v1/movement-type', 'GET', 'MovementType', 'Get Movement Types', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (38, '/v1/movement-type', 'POST', 'MovementType', 'Create Movement Type', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (39, '/v1/movement-type/:movementTypeId', 'GET', 'MovementType', 'Get Movement Type', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (40, '/v1/movement-type/:movementTypeId', 'PUT', 'MovementType', 'Update Movement Type', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (41, '/v1/movement-type/:movementTypeId', 'DELETE', 'MovementType', 'Delete Movement Type', '20250101000000');

-- Colors
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (42, '/v1/colors', 'GET', 'Color', 'Get Colors', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (43, '/v1/colors', 'POST', 'Color', 'Create Color', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (44, '/v1/colors/:colorId', 'GET', 'Color', 'Get Color', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (45, '/v1/colors/:colorId', 'PUT', 'Color', 'Update Color', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (46, '/v1/colors/:colorId', 'DELETE', 'Color', 'Delete Color', '20250101000000');

-- Strap Materials
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (47, '/v1/strap-materials', 'GET', 'StrapMaterial', 'Get Strap Materials', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (48, '/v1/strap-materials', 'POST', 'StrapMaterial', 'Create Strap Material', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (49, '/v1/strap-materials/:strapMaterialId', 'GET', 'StrapMaterial', 'Get Strap Material', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (50, '/v1/strap-materials/:strapMaterialId', 'PUT', 'StrapMaterial', 'Update Strap Material', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (51, '/v1/strap-materials/:strapMaterialId', 'DELETE', 'StrapMaterial', 'Delete Strap Material', '20250101000000');

-- Watches
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (52, '/v1/watches', 'GET', 'Watch', 'Get Watches', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (53, '/v1/watches', 'POST', 'Watch', 'Create Watch', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (54, '/v1/watches/:watchId', 'GET', 'Watch', 'Get Watch', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (55, '/v1/watches/:watchId', 'PUT', 'Watch', 'Update Watch', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (56, '/v1/watches/:watchId', 'DELETE', 'Watch', 'Delete Watch', '20250101000000');

-- Watch Variants
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (57, '/v1/watch-variants', 'GET', 'WatchVariant', 'Get Watch Variants', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (58, '/v1/watch-variants', 'POST', 'WatchVariant', 'Create Watch Variant', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (59, '/v1/watch-variants/:watchId', 'GET', 'WatchVariant', 'Get Variants By Watch', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (60, '/v1/watch-variants/:variantId', 'GET', 'WatchVariant', 'Get Watch Variant', '20250101000000'); -- Ambiguous path in code, listing both
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (61, '/v1/watch-variants/:variantId', 'PUT', 'WatchVariant', 'Update Watch Variant', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (62, '/v1/watch-variants/:variantId', 'DELETE', 'WatchVariant', 'Delete Watch Variant', '20250101000000');

-- Carts
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (63, '/v1/carts', 'POST', 'Cart', 'Create Cart', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (64, '/v1/carts', 'GET', 'Cart', 'Get Cart', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (65, '/v1/carts', 'PUT', 'Cart', 'Update Cart', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (66, '/v1/carts', 'DELETE', 'Cart', 'Clear Cart', '20250101000000');

-- Cart Items
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (67, '/v1/cart-items', 'GET', 'CartItem', 'Get Cart Items', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (68, '/v1/cart-items/:cartItemId', 'PUT', 'CartItem', 'Update Cart Item', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (69, '/v1/cart-items/:cartItemId', 'DELETE', 'CartItem', 'Delete Cart Item', '20250101000000');

-- Orders
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (70, '/v1/orders', 'GET', 'Order', 'Get Orders', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (71, '/v1/orders', 'POST', 'Order', 'Create Order', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (72, '/v1/orders/all', 'GET', 'Order', 'Get All Orders', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (73, '/v1/orders/:orderId', 'GET', 'Order', 'Get Order', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (74, '/v1/orders/:orderId', 'DELETE', 'Order', 'Delete Order', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (75, '/v1/orders/:orderId/retry-payment', 'GET', 'Order', 'Retry Payment', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (76, '/v1/orders/:orderId/change-status', 'PUT', 'Order', 'Change Order Status', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (77, '/v1/orders/:orderId/cancel', 'PUT', 'Order', 'Cancel Order', '20250101000000');

-- Order Status
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (78, '/v1/order-status', 'GET', 'OrderStatus', 'Get Order Statuses', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (79, '/v1/order-status', 'POST', 'OrderStatus', 'Create Order Status', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (80, '/v1/order-status/:orderStatusId', 'GET', 'OrderStatus', 'Get Order Status', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (81, '/v1/order-status/:orderStatusId', 'PUT', 'OrderStatus', 'Update Order Status', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (82, '/v1/order-status/:orderStatusId', 'DELETE', 'OrderStatus', 'Delete Order Status', '20250101000000');

-- Payments
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (83, '/v1/payments/vnpay-payment-return', 'GET', 'Payment', 'VNPay Return', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (84, '/v1/payments/:orderId', 'GET', 'Payment', 'Get Payments By Order', '20250101000000');

-- Order Status History
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (85, '/v1/order-status-histories/:orderId', 'GET', 'OrderStatusHistory', 'Get Order History', '20250101000000');

-- Reviews
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (86, '/v1/reviews', 'POST', 'Review', 'Create Review', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (87, '/v1/reviews/:watchId', 'GET', 'Review', 'Get Reviews', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (88, '/v1/reviews/:reviewId', 'PUT', 'Review', 'Update Review', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (89, '/v1/reviews/:reviewId', 'DELETE', 'Review', 'Delete Review', '20250101000000');

-- Discounts
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (90, '/v1/discounts', 'POST', 'Discount', 'Create Discount', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (91, '/v1/discounts', 'GET', 'Discount', 'Get Discounts', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (92, '/v1/discounts/check-apply', 'POST', 'Discount', 'Check Apply Discount', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (93, '/v1/discounts/:discountId', 'PUT', 'Discount', 'Update Discount', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (94, '/v1/discounts/:discountId', 'DELETE', 'Discount', 'Delete Discount', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (95, '/v1/discounts/:discountId', 'GET', 'Discount', 'Get Discount', '20250101000000');

-- Search
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (96, '/v1/search', 'GET', 'Search', 'Search', '20250101000000');

-- Recommendations
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (97, '/v1/recommendations/interactions', 'POST', 'Recommendation', 'Record Interaction', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (98, '/v1/recommendations/stats', 'GET', 'Recommendation', 'Get Stats', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (99, '/v1/recommendations/ai/health', 'GET', 'Recommendation', 'AI Health', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (100, '/v1/recommendations/ai/stats', 'GET', 'Recommendation', 'AI Stats', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (101, '/v1/recommendations/interactions/:userId', 'GET', 'Recommendation', 'Get User Interactions', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (102, '/v1/recommendations/similar/:watchId', 'GET', 'Recommendation', 'Get Similar Items', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (103, '/v1/recommendations/user-features/:userId', 'PUT', 'Recommendation', 'Update User Features', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (104, '/v1/recommendations/item-features/:watchId', 'PUT', 'Recommendation', 'Update Item Features', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (105, '/v1/recommendations/public', 'GET', 'Recommendation', 'Get Public Recommendations', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (106, '/v1/recommendations', 'GET', 'Recommendation', 'Get User Recommendations', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (107, '/v1/recommendations/:userId', 'GET', 'Recommendation', 'Get Recommendations By User ID', '20250101000000');

-- Reports
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (108, '/v1/reports/revenue', 'GET', 'Report', 'Get Revenue', '20250101000000');
INSERT INTO public.permissions (id, api_path, method, module, name, created_at) VALUES (109, '/v1/reports/revenue-year', 'POST', 'Report', 'Get Revenue Year', '20250101000000');

-- 2. Insert into permission_role
-- Assuming roles: 1 = ADMIN, 2 = USER (based on src/config/roles.js)

-- ADMIN has access to everything
INSERT INTO public.permission_role (role_id, permission_id, created_at)
SELECT 1, id, '20250101000000' FROM public.permissions;

-- USER Access (Selective based on src/config/roles.js)
-- UserInfo
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 6, '20250101000000'); -- /v1/auth/me (Implied)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 10, '20250101000000'); -- /v1/users/:userId (read:own)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 11, '20250101000000'); -- /v1/users/:userId (update:own)

-- Public Read Access for User (Brands, Category, etc.)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 19, '20250101000000'); -- /v1/brands
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 21, '20250101000000'); -- /v1/brands/:brandId
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 24, '20250101000000'); -- /v1/categorys
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 26, '20250101000000'); -- /v1/categorys/:categoryId

-- Address (create:own, read:own, update:own, delete:own)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 31, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 32, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 33, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 34, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 35, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 36, '20250101000000');

-- Movement Type (read:any)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 37, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 39, '20250101000000');

-- Color (read:any)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 42, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 44, '20250101000000');

-- Strap Material (read:any)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 47, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 49, '20250101000000');

-- Watch (read:any)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 52, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 54, '20250101000000');

-- Watch Variant (read:any)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 57, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 59, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 60, '20250101000000');

-- Cart (create:own, read:own, update:own, delete:own)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 63, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 64, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 65, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 66, '20250101000000');

-- Cart Item (create:own, read:own, update:own, delete:own)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 67, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 68, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 69, '20250101000000');

-- Order (create:own, read:own, update:own, delete:own)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 70, '20250101000000'); -- Get Orders (own)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 71, '20250101000000'); -- Create Order
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 73, '20250101000000'); -- Get Order
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 75, '20250101000000'); -- Retry Payment (update:own implied)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 77, '20250101000000'); -- Cancel Order (update:own implied)

-- Order Status (create:any - why? Maybe for payment hooks? But roles.js says create:any. Assuming USER can read too?)
-- No read:any in roles.js for USER on ORDER_STATUS? Except maybe implicit public? 
-- roles.js: `[resources.ORDER_STATUS]: {'create:any': ['*']}`.

-- Order Status History (read:any)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 85, '20250101000000');

-- Review (create:own, read:any, update:own, delete:own)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 86, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 87, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 88, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 89, '20250101000000');

-- Discount (read:any)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 91, '20250101000000');
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 95, '20250101000000');

-- Payment (create:own, read:any)
INSERT INTO public.permission_role (role_id, permission_id, created_at) VALUES (2, 84, '20250101000000');

