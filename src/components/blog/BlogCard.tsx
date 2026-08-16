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
    <article className='group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'>
      {/* Featured image */}
      <Link
        href={`/blog/${post.slug}`}
        className='relative block aspect-4/3 overflow-hidden bg-gray-100'
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority={priority}
          sizes='(max-width: 768px) 100vw, 33vw'
          className='object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <span className='absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white'>
          {post.category}
        </span>
      </Link>

      {/* Content */}
      <div className='flex flex-1 flex-col p-4 sm:p-5'>
        <div className='mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400'>
          <span className='flex items-center gap-1'>
            <FiCalendar className='h-3.5 w-3.5' />
            {post.date}
          </span>
          <span className='flex items-center gap-1'>
            <FiUser className='h-3.5 w-3.5' />
            {post.author}
          </span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className='mb-2 font-heading text-base font-semibold leading-snug text-gray-900 line-clamp-2 transition-colors hover:text-primary'
        >
          {post.title}
        </Link>

        <p className='mb-4 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-2'>
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className='inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark'
        >
          Read More
          <FiArrowRight className='h-3.5 w-3.5' />
        </Link>
      </div>
    </article>
  );
}
