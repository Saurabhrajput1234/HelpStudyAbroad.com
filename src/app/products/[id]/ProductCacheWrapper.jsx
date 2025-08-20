'use client';

import { useState, useEffect } from 'react';
import { fetchProductById } from '@/data/products';
import ProductDetailsWrapper from './ProductDetailsWrapper';

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

export default function ProductCacheWrapper({ product: initialProduct }) {
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    // Function to check cache and fetch if needed
    const checkCacheAndFetch = async () => {
      const productId = initialProduct.id;
      const cacheKey = `product_${productId}`;
      
      try {
        // Check if we have cached data
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const isExpired = Date.now() - timestamp > CACHE_EXPIRATION;
          
          if (!isExpired) {
            // Use cached data if not expired
            console.log('Using cached product data');
            setProduct(data);
            return;
          }
          console.log('Cache expired, fetching fresh data');
        }
        
        // Fetch fresh data if no cache or expired
        const freshData = await fetchProductById(productId);
        
        // Update state with fresh data
        setProduct(freshData);
        
        // Save to cache with timestamp
        localStorage.setItem(cacheKey, JSON.stringify({
          data: freshData,
          timestamp: Date.now()
        }));
        
      } catch (error) {
        console.error('Error fetching or caching product:', error);
        // Fallback to initial data if there's an error
        setProduct(initialProduct);
      }
    };
    
    // Only run on client-side
    if (typeof window !== 'undefined') {
      checkCacheAndFetch();
    }
  }, [initialProduct]);

  return <ProductDetailsWrapper product={product} />;
}