import React from "react";

const ExpertCard = React.memo(({ image, name, expertise, description, rating }) => {
  // Generate srcSet for responsive images (assuming naming convention: image-400.jpg, image-800.jpg, image-1200.jpg)
  let srcSet = image;
  let sizes = "100vw";
  let placeholder = image;

  // If image is a local import, try to generate srcSet for different sizes
  if (typeof image === 'string' && image.match(/\.(jpg|jpeg|png|webp)$/)) {
    const ext = image.substring(image.lastIndexOf('.'));
    const base = image.replace(ext, '');
    srcSet = `${base}-400${ext} 400w, ${base}-800${ext} 800w, ${base}-1200${ext} 1200w`;
    sizes = "(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px";
    // Use a very small version as a placeholder if available
    placeholder = `${base}-blur${ext}`;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center h-full min-h-[420px] transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="w-24 h-24 rounded-full border-4 border-green-100 mb-4 overflow-hidden relative">
        {/* Blurred placeholder */}
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover absolute inset-0 blur-md scale-110 z-0"
          style={{ filter: 'blur(16px)', zIndex: 0 }}
        />
        {/* Main image */}
        <img
          src={image}
          srcSet={srcSet}
          sizes={sizes}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover relative z-10 transition-opacity duration-500"
          onLoad={e => { e.target.style.opacity = 1; }}
          style={{ opacity: 0 }}
        />
      </div>
      <h3 className="text-xl font-bold text-green-800 mb-1 text-center">{name}</h3>
      <p className="text-green-600 font-semibold mb-2 text-center">{expertise}</p>
      <p className="text-gray-600 text-center text-sm mb-4 line-clamp-4 flex-1">{description}</p>
      <div className="flex items-center gap-1 mt-auto">
        <span className="text-yellow-500 text-lg">★</span>
        <span className="text-yellow-600 font-bold text-lg">{rating}</span>
      </div>
    </div>
  );
});

export default ExpertCard; 