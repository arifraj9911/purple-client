import Image from 'next/image';
import { FiCalendar, FiFolder, FiUser } from 'react-icons/fi';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { type BlogPost } from '@/data/blogs';
import PostContent from './PostContent';
import ShareButtons from './ShareButtons';
import Comments from './Comments';
import BlogCard from './BlogCard';

interface BlogDetailPageProps {
  post: BlogPost;
  related: BlogPost[];
}

export default function BlogDetailPage({ post, related }: BlogDetailPageProps) {
  return (
    <div className='bg-white'>
      {/* ── Breadcrumb ── */}
      <div className='container mx-auto px-4 pt-6 md:px-6 lg:px-8'>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        />
      </div>

      {/* ── Featured image ── */}
      <div className='container mx-auto px-4 pt-6 md:px-6 lg:px-8'>
        <div className='relative aspect-[16/9] w-full overflow-hidden rounded-2xl'>
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes='(max-width: 1280px) 100vw, 1280px'
            className='object-cover'
          />
        </div>
      </div>

      {/* ── Article body ── */}
      <article className='container mx-auto px-4 py-8 md:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl'>
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400'>
            <span className='flex items-center gap-1.5'>
              <FiCalendar className='h-4 w-4' />
              {post.date}
            </span>
            <span className='flex items-center gap-1.5'>
              <FiUser className='h-4 w-4' />
              {post.author}
            </span>
            <span className='flex items-center gap-1.5'>
              <FiFolder className='h-4 w-4' />
              {post.category}
            </span>
          </div>

          <h1 className='mt-3 font-heading text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl'>
            {post.title}
          </h1>

          <div className='mt-6'>
            <PostContent blocks={post.content} />
          </div>

          {/* ── Tags + Share ── */}
          <div className='mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6'>
            <div className='flex flex-wrap gap-2'>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className='rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600'
                >
                  #{tag}
                </span>
              ))}
            </div>
            <ShareButtons title={post.title} />
          </div>
        </div>
      </article>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className='bg-gray-50 py-12'>
          <div className='container mx-auto px-4 md:px-6 lg:px-8'>
            <h2 className='mb-6 font-heading text-xl font-bold text-gray-900 sm:text-2xl'>
              Related Posts
            </h2>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {related.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Comments ── */}
      <section className='bg-white py-12'>
        <div className='container mx-auto px-4 md:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl'>
            <Comments postId={post.id} />
          </div>
        </div>
      </section>
    </div>
  );
}
