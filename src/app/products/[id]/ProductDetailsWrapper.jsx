'use client';

import { useState, useContext, useEffect } from 'react';
import ProductDetails from '@/components/ProductDetails';
import RecentlyViewed from '@/components/RecentlyViewed';
import { CartContext } from '@/context/CartContext';

export default function ProductDetailsWrapper({ product }) {
  const { addToCart } = useContext(CartContext);

                      // Default color = first variant's color
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || '');
  const [selectedSize, setSelectedSize] = useState('');

  // Sizes depend on selected color
  const availableSizesForColor = product.variants.find(v => v.color === selectedColor)?.sizes || [];

                    // Reset size if color changes
  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

                  // Track recently viewed products (max 3)
  useEffect(() => {
    let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewedProducts')) || [];
    const existingIndex = recentlyViewed.findIndex(item => item.id === product.id);
    if (existingIndex !== -1) recentlyViewed.splice(existingIndex, 1);
    recentlyViewed.unshift(product);
    recentlyViewed = recentlyViewed.slice(0, 3);
    localStorage.setItem('recentlyViewedProducts', JSON.stringify(recentlyViewed));
  }, [product]);

              // Validate before adding to cart
  const handleAddToCart = () => {
    if (!selectedColor) return alert('Please select a color.');
    if (!selectedSize) return alert('Please select a size.');
    addToCart(product, selectedColor, selectedSize);
  };

  return (
    <>
      <ProductDetails
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorSelect={setSelectedColor}
        onSizeSelect={setSelectedSize}
        onAddToCart={handleAddToCart}
        availableSizesForColor={availableSizesForColor}
      />
      <RecentlyViewed />
    </>
  );
}
