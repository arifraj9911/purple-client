import { type ContentBlock } from '@/data/blogs';

interface PostContentProps {
  blocks: ContentBlock[];
}

/** Renders the rich-text content blocks of a blog post. */
export default function PostContent({ blocks }: PostContentProps) {
  return (
    <div className='space-y-4'>
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          return (
            <p
              key={index}
              className='text-[15px] leading-relaxed text-gray-600'
            >
              {block.text}
            </p>
          );
        }

        if (block.type === 'heading') {
          return (
            <h2
              key={index}
              className='pt-2 font-heading text-xl font-bold text-gray-900'
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === 'list') {
          return (
            <ul key={index} className='space-y-2 pl-5'>
              {block.items.map((item) => (
                <li
                  key={item}
                  className='list-disc text-[15px] leading-relaxed text-gray-600'
                >
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <blockquote
            key={index}
            className='rounded-r-lg border-l-4 border-primary bg-primary-light/40 px-4 py-3 text-base italic text-gray-700'
          >
            {block.text}
          </blockquote>
        );
      })}
    </div>
  );
}
