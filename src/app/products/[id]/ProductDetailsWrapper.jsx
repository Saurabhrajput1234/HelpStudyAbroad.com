'use client';

import { useState, useContext, useEffect } from 'react';
import ProductDetails from '@/components/ProductDetails';
import RecentlyViewed from '@/components/RecentlyViewed';
import { CartContext } from '@/context/CartContext';

export default function ProductDetailsWrapper({ product }) {
  const { addToCart } = useContext(CartContext);

  // Set default color to the first variant's color
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || '');
  const [selectedSize, setSelectedSize] = useState('');

  // Get available sizes based on the selected color
  const availableSizesForColor = product.variants.find(v => v.color === selectedColor)?.sizes || [];

  // Reset selected size when color changes
  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  // Check both color and size before adding to cart
  const handleAddToCart = () => {
    if (!selectedColor) {
      alert('Please select a color.');
      return;
    }
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
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
