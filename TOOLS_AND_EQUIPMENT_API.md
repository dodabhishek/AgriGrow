# Tools and Equipment API Integration

This document describes the changes made to integrate tools and equipment data from the backend API instead of using static data.

## Changes Made

### 1. Backend API Integration

- **Products Service**: Created `frontend/src/lib/productsService.js` to handle API calls to the backend
- **API Endpoints**: Using existing `/api/products` endpoints for CRUD operations
- **Data Structure**: Products now include fields like `name`, `description`, `price`, `imageUrl`, `type`, and `user`

### 2. Frontend Components Updated

#### Shop.jsx
- Removed static import of `toolsAndEquipment`
- Added state management for products data
- Added loading state while fetching data
- Integrated with `productsService.getAllProducts()`

#### EquipmentDetail.jsx
- Removed static import of `toolsAndEquipment`
- Added state management for individual product data
- Added loading state while fetching product details
- Integrated with `productsService.getAllProducts()` to find specific product

### 3. Database Schema Updates

#### Product Model (`backend/src/models/product.model.js`)
- Added `type` field with enum values: `['sensor', 'monitoring', 'kit', 'irrigation', 'drone', 'controller', 'tool']`
- Default type is 'tool'

#### Product Controller (`backend/src/controller/productController.js`)
- Updated to handle `type` field in create and update operations
- Maintains backward compatibility

### 4. Sample Data

Created seed script (`backend/src/seedProducts.js`) with sample products:
- Smart Soil Sensor ($999)
- AI Crop Monitoring Tool ($1299)
- Soil Analysis Kit ($299)
- Automated Irrigation System ($2499)
- Drone for Crop Monitoring ($3999)
- Greenhouse Climate Controller ($1899)

## Usage

### 1. Seed Sample Data

```bash
cd backend
npm run seed
```

**Note**: Requires an admin user to exist in the database first.

### 2. API Endpoints

- `GET /api/products` - Get all products (public)
- `GET /api/products/:userId` - Get products for specific user (protected)
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### 3. Frontend Integration

The frontend now automatically fetches products from the API when:
- Shop page loads (for tools & equipment section)
- Equipment detail page loads (for specific product details)

## Benefits

1. **Dynamic Data**: Products can be added/updated through the admin interface
2. **Scalability**: Easy to add new products without code changes
3. **Consistency**: All product data managed in one place
4. **Real-time Updates**: Changes reflect immediately across the application

## Migration Notes

- Static `toolsAndEquipment.js` file is no longer used
- All product data now comes from the backend API
- Loading states added for better user experience
- Error handling included for API failures

## Future Enhancements

1. Add product categories and filtering
2. Implement product search functionality
3. Add product ratings and reviews
4. Integrate with shopping cart functionality
5. Add product images gallery support 