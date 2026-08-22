import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import {
  ProductGallery,
  ProductPurchase,
  ProductTabs,
  RelatedProducts,
} from '@/components/product-detail';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} — Purple BD`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <div className='bg-white'>
      {/* ── Breadcrumb ── */}
      <div className='container mx-auto px-4 pt-6 md:px-6 lg:px-8'>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: product.category, href: '/shop' },
            { label: product.name },
          ]}
        />
      </div>

      {/* ── Gallery + Info ── */}
      <div className='container mx-auto px-4 py-6 md:px-6 lg:px-8 lg:py-8'>
        <div className='grid gap-8 lg:grid-cols-2 lg:gap-12'>
          <ProductGallery images={product.images} alt={product.name} />
          <ProductPurchase product={product} />
        </div>

        {/* ── Tabs: Description / Info / Reviews ── */}
        <ProductTabs product={product} />
      </div>

      {/* ── Related products ── */}
      <RelatedProducts currentId={product.id} categoryId={product.categoryId} />
    </div>
  );
}
