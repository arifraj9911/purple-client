import Link from 'next/link';
import { blogPosts } from '@/data/blogs';
import BlogCard from '@/components/blog/BlogCard';

export default function Blog() {
  return (
    <section className='bg-white py-8 sm:py-12'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        {/* ── Header ── */}
        <div className='mb-4 flex items-end justify-between md:mb-8'>
          <div>
            <span className='inline-block rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary'>
            From Our Blog
            </span>
            <h2 className='mt-1 font-heading text-2xl font-bold text-gray-900 sm:text-3xl md:mt-2.5'>
              Latest Articles
            </h2>
          </div>
          <Link
            href='/blog'
            className='hidden shrink-0 items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark sm:flex'
          >
            View All
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>
        </div>

        {/* ── Grid ── */}
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.slice(0, 3).map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              priority={index === 0}
            />
          ))}
        </div>

        {/* Mobile View All */}
        <div className='mt-6 text-center sm:hidden'>
          <Link
            href='/blog'
            className='inline-flex items-center gap-1 text-sm font-medium text-primary'
          >
            View All Articles
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
