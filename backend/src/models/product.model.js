import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
  },
  imageUrl: {
    type: String,
  },
  type: {
    type: String,
    enum: ['sensor', 'monitoring', 'kit', 'irrigation', 'drone', 'controller', 'tool'],
    default: 'tool'
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user ID"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Product = mongoose.model("Product", productSchema);

export default Product; // Use export default for ES Modules