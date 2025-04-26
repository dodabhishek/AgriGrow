import React from "react";
import { useAuthStore } from "../../../store/useAuthStore";

const Card = ({ name, description, price, imageUrl }) => {
  const { authUser } = useAuthStore();
  const isAdmin = authUser && authUser.role === "admin";

  return (
    <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      {/* Product Image */}
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Image Available
          </div>
        )}
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {name}
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {description}
        </p>
        <p className="block font-sans text-lg font-bold leading-relaxed text-green-600 antialiased">
          ${price}
        </p>
      </div>
      <div className="p-6 pt-0">
        {isAdmin ? (
          <button
            data-ripple-light="true"
            type="button"
            className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            View Details
          </button>
        ) : (
          <button
            data-ripple-light="true"
            type="button"
            className="select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;