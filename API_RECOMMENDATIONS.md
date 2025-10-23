# API Recommendations - Danh sách đề xuất

## 🎯 API Endpoints cho Recommendations

### **1. Lấy danh sách đề xuất cho user**

**Endpoint:** `GET /api/v1/recommendations/recommendations/:userId`

**Parameters:**

-   `userId` (path) - ID của user
-   `limit` (query, optional) - Số lượng đề xuất (default: 10)
-   `exclude_interactions` (query, optional) - Loại bỏ items đã tương tác (default: true)

**Example Request:**

```bash
curl "http://localhost:3000/api/v1/recommendations/recommendations/1?limit=5&exclude_interactions=true"
```

**Response:**

```json
{
	"success": true,
	"message": "Recommendations retrieved successfully",
	"data": {
		"recommendations": [
			{
				"watch_id": 123,
				"score": 0.85,
				"name": "Rolex Submariner Date",
				"base_price": 85000000,
				"rating": 4.8
			},
			{
				"watch_id": 456,
				"score": 0.82,
				"name": "Omega Speedmaster",
				"base_price": 45000000,
				"rating": 4.7
			}
		],
		"user_id": 1,
		"count": 5
	}
}
```

### **2. Lấy sản phẩm tương tự**

**Endpoint:** `GET /api/v1/recommendations/similar/:watchId`

**Parameters:**

-   `watchId` (path) - ID của sản phẩm
-   `limit` (query, optional) - Số lượng sản phẩm tương tự (default: 10)

**Example Request:**

```bash
curl "http://localhost:3000/api/v1/recommendations/similar/123?limit=5"
```

**Response:**

```json
{
	"success": true,
	"message": "Similar items retrieved successfully",
	"data": {
		"similar_items": [
			{
				"watch_id": 456,
				"similarity": 0.78,
				"name": "Omega Speedmaster",
				"base_price": 45000000,
				"rating": 4.7
			},
			{
				"watch_id": 789,
				"similarity": 0.75,
				"name": "TAG Heuer Carrera",
				"base_price": 25000000,
				"rating": 4.5
			}
		],
		"watch_id": 123,
		"count": 5
	}
}
```

### **3. Ghi nhận tương tác user**

**Endpoint:** `POST /api/v1/recommendations/interactions`

**Body:**

```json
{
	"user_id": 1,
	"watch_id": 123,
	"interaction_type": "view",
	"session_id": "session_12345"
}
```

**Interaction Types:**

-   `"view"` - Xem sản phẩm (score: 1)
-   `"cart_add"` - Thêm vào giỏ hàng (score: 3)
-   `"purchase"` - Mua hàng (score: 6)

**Response:**

```json
{
	"success": true,
	"message": "Interaction recorded successfully",
	"data": {
		"id": 1,
		"user_id": 1,
		"watch_id": 123,
		"interaction_type": "view",
		"score": 1,
		"session_id": "session_12345",
		"created_at": "20231201120000"
	}
}
```

### **4. Lấy lịch sử tương tác của user**

**Endpoint:** `GET /api/v1/recommendations/interactions/:userId`

**Parameters:**

-   `userId` (path) - ID của user
-   `limit` (query, optional) - Số lượng tương tác (default: 20)

**Example Request:**

```bash
curl "http://localhost:3000/api/v1/recommendations/interactions/1?limit=10"
```

**Response:**

```json
{
	"success": true,
	"message": "User interactions retrieved successfully",
	"data": [
		{
			"id": 1,
			"user_id": 1,
			"watch_id": 123,
			"interaction_type": "view",
			"score": 1,
			"created_at": "20231201120000",
			"watch": {
				"id": 123,
				"name": "Rolex Submariner",
				"base_price": 85000000,
				"brand": {
					"id": 1,
					"name": "Rolex"
				},
				"category": {
					"id": 1,
					"name": "Diving"
				}
			}
		}
	]
}
```

## 🔧 AI Server Monitoring

### **5. Kiểm tra trạng thái AI Server**

**Endpoint:** `GET /api/v1/recommendations/ai/health`

**Response:**

```json
{
	"success": true,
	"message": "AI server health retrieved successfully",
	"data": {
		"status": "healthy",
		"model_loaded": true,
		"last_model_load": "2023-12-01T12:00:00"
	}
}
```

### **6. Thống kê AI Server**

**Endpoint:** `GET /api/v1/recommendations/ai/stats`

**Response:**

```json
{
	"success": true,
	"message": "AI server statistics retrieved successfully",
	"data": {
		"model_loaded": true,
		"users_cached": 150,
		"items_cached": 75,
		"last_model_load": "2023-12-01T12:00:00"
	}
}
```

### **7. Thống kê tổng quan**

**Endpoint:** `GET /api/v1/recommendations/stats`

**Response:**

```json
{
	"success": true,
	"message": "Recommendation statistics retrieved successfully",
	"data": {
		"totalInteractions": 1250,
		"uniqueUsers": 150,
		"uniqueItems": 75,
		"note": "Recommendations now served by AI server in real-time"
	}
}
```

## 🚀 Cách sử dụng trong Frontend

### **JavaScript Example:**

```javascript
// Lấy đề xuất cho user
async function getRecommendations(userId, limit = 10) {
	try {
		const response = await fetch(
			`http://localhost:3000/api/v1/recommendations/recommendations/${userId}?limit=${limit}`
		);
		const data = await response.json();
		return data.data.recommendations;
	} catch (error) {
		console.error('Error getting recommendations:', error);
		return [];
	}
}

// Ghi nhận tương tác
async function recordInteraction(userId, watchId, interactionType) {
	try {
		const response = await fetch(
			'http://localhost:3000/api/v1/recommendations/interactions',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_id: userId,
					watch_id: watchId,
					interaction_type: interactionType,
					session_id: Date.now().toString(),
				}),
			}
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error recording interaction:', error);
	}
}

// Lấy sản phẩm tương tự
async function getSimilarItems(watchId, limit = 10) {
	try {
		const response = await fetch(
			`http://localhost:3000/api/v1/recommendations/similar/${watchId}?limit=${limit}`
		);
		const data = await response.json();
		return data.data.similar_items;
	} catch (error) {
		console.error('Error getting similar items:', error);
		return [];
	}
}
```

## 📊 Response Codes

-   **200** - Success
-   **400** - Bad Request (missing parameters)
-   **404** - User/Item not found
-   **500** - Internal Server Error

## 🔄 Fallback Behavior

Khi AI server không khả dụng, hệ thống sẽ tự động fallback về:

-   **Popular items** cho recommendations
-   **Same category/brand items** cho similar items
-   **Error messages** rõ ràng cho debugging

## 🎯 Best Practices

1. **Ghi nhận tương tác** ngay khi user xem/mua sản phẩm
2. **Cache recommendations** ở frontend để giảm API calls
3. **Monitor AI server health** thường xuyên
4. **Handle fallback gracefully** khi AI server down
5. **Use appropriate limits** để tránh overload
