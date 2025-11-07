import React from 'react';
import { Loader, Trash2, Plus, Minus } from 'lucide-react';
import Basket from '../../assets/Images/Basket.jpg';

// Helper function for formatting price
const formatPrice = (val) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(val);

// Use React.memo to prevent re-renders if props are the same
const CartItem = React.memo(
  ({ item, onUpdateQuantity, onRemove, isUpdating, isRemoving }) => {
    // Check for valid item
    if (!item?.productId) {
      console.warn('Invalid cart item (no productId):', item);
      return null;
    }

    const { _id, name, price, imageUrl } = item.productId;
    // We get the quantity directly from the item prop
    const { quantity } = item;

    console.log(`Rendering CartItem: ${name} (Qty: ${quantity})`);

    return (
      <div className="group/card relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 blur-sm transition-all duration-500 group-hover/card:blur-md"></div>
        <div className="relative bg-white/95 backdrop-blur-lg border-2 border-emerald-100/50 shadow-lg transition-all duration-500 hover:bg-white/100 p-6">
          <div className="flex gap-6">
            <img
              src={imageUrl || Basket}
              alt={name}
              className="w-32 h-32 object-cover rounded-xl border-2 border-emerald-100/50"
              onError={(e) => (e.target.src = Basket)}
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove(_id);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isRemoving || isUpdating}
                  type="button"
                >
                  {isRemoving ? <Loader className="size-5 animate-spin" /> : <Trash2 className="size-5" />}
                </button>
              </div>
              <p className="text-gray-600 mt-2">₹{price} per unit</p>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-4 mt-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onUpdateQuantity(_id, quantity - 1);
                  }}
                  className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors border-2 border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdating || isRemoving || quantity <= 1}
                  type="button"
                >
                  {/* Show loader only if this item is updating */}
                  {isUpdating ? <Loader className="size-4 animate-spin" /> : <Minus className="size-4" />}
                </button>
                <span className="text-lg font-medium text-gray-800 w-8 text-center">{quantity}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onUpdateQuantity(_id, quantity + 1);
                  }}
                  className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors border-2 border-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdating || isRemoving}
                  type="button"
                >
                   {/* Show loader only if this item is updating */}
                  {isUpdating ? <Loader className="size-4 animate-spin" /> : <Plus className="size-4" />}
                </button>
              </div>
              <p className="text-lg font-semibold text-gray-800 mt-4">
                Total: {formatPrice(price * quantity)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default CartItem;