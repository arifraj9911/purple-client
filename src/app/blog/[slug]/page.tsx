import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, parseBlogDate } from '@/data/blogs';
import { BlogDetailPage } from '@/components/blog';

interface BlogDetailRouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Blog Post Not Found' };

  return {
    title: `${post.title} — Purple BD`,
    description: post.excerpt,
  };
}

export default async function BlogDetailRoute({
  params,
}: BlogDetailRouteProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const recent = blogPosts
    .filter((p) => p.id !== post.id)
    .sort((a, b) => parseBlogDate(b.date) - parseBlogDate(a.date))
    .slice(0, 3);

  return <BlogDetailPage post={post} recent={recent} />;
}
