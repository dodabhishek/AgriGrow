import { useAuthStore } from "../../../store/useAuthStore";
import { axiosInstance } from "../../../lib/axios";

const Card = ({ name, description, price, imageUrl, productId }) => {
  const { authUser } = useAuthStore(); // Get the logged-in user
  const fallbackImage = "/images/Basket.jpg";

  const handleAddToCart = async () => {
    try {
      const response = await axiosInstance.post("/cart", {
        userId: authUser._id, // Pass the logged-in user's ID
        productId, // Pass the product ID
      });
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  const handleEditProduct = () => {
    console.log(`Edit product with ID: ${productId}`); // Placeholder for edit functionality
    // Add your edit logic here (e.g., open a modal to edit the product)
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={imageUrl || fallbackImage}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h3 className="text-lg font-bold mt-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-800 font-semibold mt-2">${price}</p>
      <div className="flex justify-between mt-4">
        {authUser?.role === "admin" ? (
          <button
            onClick={handleEditProduct}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;