import { fetchProductById } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductDetailsWrapper from './ProductDetailsWrapper';
import ProductCacheWrapper from './ProductCacheWrapper';

export default async function ProductPage({ params }) {
  // Ensure params is properly awaited
  const id = params.id;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl">
      <ProductCacheWrapper product={product} />
    </div>
  );
}
