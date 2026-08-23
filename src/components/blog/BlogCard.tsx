import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi';
import { type BlogPost } from '@/data/blogs';

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  return (
    <article className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-300 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg'>
      {/* Featured image */}
      <Link
        href={`/blog/${post.slug}`}
        className='relative block p-[4px]'
      >
        <div className='relative w-auto h-[140px] sm:h-[260px] overflow-hidden rounded-t-lg bg-gray-50 flex items-center justify-center'>
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority={priority}
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='h-full w-full transition-transform duration-500 group-hover:scale-105'
          />
        </div>

        {/* Category Badge */}
        <span className='absolute left-2 top-2 z-20 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm'>
          {post.category}
        </span>
      </Link>

      {/* Content */}
      <div className='flex flex-1 flex-col px-3 pb-3 pt-2 sm:px-3.5 sm:pb-3.5 sm:pt-2.5'>
        {/* Meta */}
        <div className='mb-1.5 flex md:items-center gap-x-3 gap-y-1 text-[8px] text-gray-400 sm:text-xs'>
          <span className='flex items-center gap-0.5 md:gap-1'>
            <FiCalendar className='h-2.5 w-2.5 md:h-3.5 md:w-3.5' />
            {post.date}
          </span>
          <span className='flex items-center gap-0.5 md:gap-1'>
            <FiUser className='h-2.5 w-2.5 md:h-3.5 md:w-3.5' />
            {post.author}
          </span>
        </div>

        {/* Title */}
        <Link
          href={`/blog/${post.slug}`}
          className='mb-1.5 md:mb-2 font-heading text-sm font-semibold leading-snug text-gray-800 transition-colors hover:text-primary line-clamp-2 sm:text-[15px]'
        >
          {post.title}
        </Link>

        {/* Excerpt */}
        <p className='mb-2 md:mb-3 flex-1 text-[11px] leading-tight text-gray-500 line-clamp-2 sm:text-sm'>
          {post.excerpt}
        </p>

        {/* Read More Footer */}
        <div className='mt-auto flex items-center justify-between pt-2 border-t border-gray-100'>
          <Link
            href={`/blog/${post.slug}`}
            className='inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-all duration-200 hover:text-primary-dark hover:gap-2 sm:text-sm'
          >
            <span>Read More</span>
            <FiArrowRight className='h-3.5 w-3.5' />
          </Link>
        </div>
      </div>
    </article>
  );
}
