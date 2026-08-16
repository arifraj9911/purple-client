import Link from 'next/link';
import { blogPosts } from '@/data/blogs';

export default function Blog() {
  return (
    <section className='bg-white py-12 sm:py-16 lg:py-20'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        {/* ── Header ── */}
        <div className='mb-4 flex items-end justify-between md:mb-8'>
          <div>
            <span className='inline-block rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary'>
              📝 From Our Blog
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
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className='group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
            >
              {/* Featured Image */}
              <Link
                href={`/blog/${post.slug}`}
                className='relative block aspect-4/3 overflow-hidden bg-gray-100'
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image.src}
                  alt={post.title}
                  className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </Link>

              {/* Content */}
              <div className='flex flex-1 flex-col p-4 sm:p-5'>
                {/* Meta */}
                <div className='mb-2 flex items-center gap-3 text-xs text-gray-400'>
                  <span className='flex items-center gap-1'>
                    📅 {post.date}
                  </span>
                  <span className='flex items-center gap-1'>
                    ✍️ {post.author}
                  </span>
                </div>

                {/* Title */}
                <Link
                  href={`/blog/${post.slug}`}
                  className='mb-2 font-heading text-base font-semibold leading-snug text-gray-900 transition-colors hover:text-primary line-clamp-2'
                >
                  {post.title}
                </Link>

                {/* Excerpt */}
                <p className='mb-4 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-2'>
                  {post.excerpt}
                </p>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}`}
                  className='inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark'
                >
                  Read More
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3.5 w-3.5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </Link>
              </div>
            </article>
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
