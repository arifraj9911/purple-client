'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Pagination } from '@/components/ui/pagination';
import { blogPosts } from '@/data/blogs';
import BlogCard from './BlogCard';

const POSTS_PER_PAGE = 4;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = blogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 pt-6 md:px-6 lg:px-8'>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
      </div>

      <div className='container mx-auto px-4 py-6 pb-12 md:px-6 lg:px-8'>
        <div className='mb-8 text-center'>
          <h1 className='font-heading text-2xl font-bold text-gray-900 sm:text-3xl'>
            Our Blog
          </h1>
          <p className='mx-auto mt-2 max-w-xl text-sm text-gray-500 sm:text-base'>
            Tips, guides and inspiration for artists and crafters.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {paginatedPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              priority={index === 0 && currentPage === 1}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className='mt-10'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
