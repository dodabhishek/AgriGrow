import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:3000/api',
  withCredentials: true,
});

export const productsService = {
  // Fetch all products from the backend
  async getAllProducts() {
    try {
      const response = await axiosInstance.get('/products');
      return response.data.products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];x
    }
  },

  // Fetch a single product by ID
  async getProductById(id) {
    console.log("getProductById called");
    try {
      const response = await axiosInstance.get(`/products/single/${id}`);
      return response.data.product || null;
    } catch (error) {
      console.error('Error fetching product by id:', error);
      return null;
    }
  },

  // Add a product to the cart
  async addToCart(productId) {
    console.log("addToCart called", productId);
    
    if (!productId) {
      throw new Error('Product ID is required');
    }

    try {
      const response = await axiosInstance.post('/cart', { productId });
      return response.data;
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        throw new Error('You must be logged in to add items to your cart.');
      }
      console.error('Error adding to cart:', error);
      console.error('Error response data:', error.response?.data);
      throw error;
    }
  },

  // Fetch products for a specific user (if needed)
  async getUserProducts(userId) {
    try {
      const response = await axiosInstance.get(`/products/${userId}`);
      return response.data.products || [];
    } catch (error) {
      console.error('Error fetching user products:', error);
      return [];
    }
  },

  // Create a new product (admin only)
  async createProduct(productData) {
    try {
      const response = await axiosInstance.post('/products', productData);
      return response.data.product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update a product
  async updateProduct(productId, productData) {
    try {
      const response = await axiosInstance.put(`/products/${productId}`, productData);
      return response.data.product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete a product
  async deleteProduct(productId) {
    try {
      const response = await axiosInstance.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}; 