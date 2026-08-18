import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiFolder, FiUser } from 'react-icons/fi';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { type BlogPost } from '@/data/blogs';
import PostContent from './PostContent';
import ShareButtons from './ShareButtons';
import Comments from './Comments';

interface BlogDetailPageProps {
  post: BlogPost;
  recent: BlogPost[];
}

export default function BlogDetailPage({ post, recent }: BlogDetailPageProps) {
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

      {/* ── Article body + sticky recent posts sidebar ── */}
      <div className='container mx-auto px-4 py-10 md:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]'>
          {/* Left column — article */}
          <article className='min-w-0'>
            {/* Featured image — only inside the left (article) column */}
            <div className='relative h-48 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-64 lg:h-100'>
              {/* Blurred background fills the letterboxed sides */}
              <Image
                src={post.image}
                alt=''
                fill
                sizes='(max-width: 1024px) 100vw, 800px'
                className='absolute inset-0 h-full w-full scale-110 object-cover blur-xl saturate-150'
                aria-hidden='true'
              />
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes='(max-width: 1024px) 100vw, 800px'
                className='relative z-10 h-full w-full object-contain'
              />
            </div>

            <div className='mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400'>
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

            {/* ── Comments ── */}
            <div className='mt-10 border-t border-gray-100 pt-8'>
              <Comments postId={post.id} />
            </div>
          </article>

          {/* Right column — sticky recent posts */}
          {recent.length > 0 && (
            <aside className='lg:sticky lg:top-32 lg:self-start lg:h-fit'>
              <h2 className='mb-5 font-heading text-xl font-bold text-gray-900'>
                Recent Posts
              </h2>
              <div className='space-y-4'>
                {recent.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className='group flex gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-all hover:border-primary/30 hover:shadow-sm'
                  >
                    <div className='relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100'>
                      <Image
                        src={rp.image}
                        alt={rp.title}
                        fill
                        sizes='96px'
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                      />
                    </div>
                    <div className='min-w-0'>
                      <p className='text-xs text-gray-400'>{rp.date}</p>
                      <h3 className='mt-1 font-heading text-sm font-semibold leading-snug text-gray-900 line-clamp-2 transition-colors group-hover:text-primary'>
                        {rp.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
