'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { FiMessageSquare, FiThumbsUp } from 'react-icons/fi';
import { comments as seedComments, type BlogComment } from '@/data/blogs';

interface CommentsProps {
  postId: number;
}

const fieldClass = (hasError?: string) =>
  `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary ${
    hasError ? 'border-red-400' : 'border-gray-200'
  }`;

interface ReplyFormProps {
  parent: BlogComment;
  onCancel: () => void;
  onSubmit: (name: string, text: string) => void;
}

function ReplyForm({ parent, onCancel, onSubmit }: ReplyFormProps) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<{ name?: string; text?: string }>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: { name?: string; text?: string } = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!text.trim()) next.text = 'Reply is required';
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit(name.trim(), text.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className='mt-3 space-y-2.5 rounded-xl border border-gray-200 bg-white p-3.5'
    >
      <p className='text-xs text-gray-500'>
        Replying to{' '}
        <span className='font-semibold text-gray-700'>{parent.author}</span>
      </p>

      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Your name'
          className={fieldClass(errors.name)}
        />
        {errors.name && (
          <p className='mt-1 text-xs text-red-500'>{errors.name}</p>
        )}
      </div>

      <div>
        <textarea
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Write your reply to ${parent.author}...`}
          className={`${fieldClass(errors.text)} resize-none`}
        />
        {errors.text && (
          <p className='mt-1 text-xs text-red-500'>{errors.text}</p>
        )}
      </div>

      <div className='flex items-center gap-2'>
        <button
          type='submit'
          className='rounded-md bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark'
        >
          Post Reply
        </button>
        <button
          type='button'
          onClick={onCancel}
          className='rounded-md px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700'
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function Comments({ postId }: CommentsProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [list, setList] = useState<BlogComment[]>(() =>
    seedComments.filter((comment) => comment.postId === postId),
  );
  const [liked, setLiked] = useState<number[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<{ name?: string; text?: string }>({});

  const toggleLike = (id: number) =>
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const likeCount = (comment: BlogComment) =>
    comment.likes + (liked.includes(comment.id) ? 1 : 0);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: { name?: string; text?: string } = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!text.trim()) next.text = 'Comment is required';
    setErrors(next);
    if (Object.keys(next).length) return;

    const newComment: BlogComment = {
      id: Date.now(),
      postId,
      author: name.trim(),
      text: text.trim(),
      date: 'Just now',
      likes: 0,
    };
    setList((prev) => [newComment, ...prev]);
    setName('');
    setText('');
  };

  const addReply = (parentId: number, author: string, replyText: string) => {
    const newReply: BlogComment = {
      id: Date.now(),
      postId,
      author,
      text: replyText,
      date: 'Just now',
      likes: 0,
      parentId,
    };
    setList((prev) => [...prev, newReply]);
    setReplyingTo(null);
  };

  const childrenOf = (id: number) => list.filter((c) => c.parentId === id);

  const renderComment = (comment: BlogComment): ReactNode => {
    const children = childrenOf(comment.id);
    const isLiked = liked.includes(comment.id);

    return (
      <div key={comment.id}>
        <div className='flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4'>
          <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary'>
            {comment.author.charAt(0).toUpperCase()}
          </div>

          <div className='min-w-0 flex-1'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <p className='text-sm font-semibold text-gray-900'>
                {comment.author}
              </p>
              <span className='text-xs text-gray-400'>{comment.date}</span>
            </div>
            <p className='mt-1.5 text-sm leading-relaxed text-gray-600'>
              {comment.text}
            </p>

            <div className='mt-3 flex items-center gap-4'>
              <button
                type='button'
                onClick={() => toggleLike(comment.id)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                  isLiked ? 'text-primary' : 'text-gray-500 hover:text-primary'
                }`}
              >
                <FiThumbsUp
                  className={`h-3.5 w-3.5 ${isLiked ? 'fill-primary' : ''}`}
                />
                {likeCount(comment)}
              </button>
              <button
                type='button'
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
                className='flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-primary'
              >
                <FiMessageSquare className='h-3.5 w-3.5' />
                Reply
              </button>
            </div>

            {replyingTo === comment.id && (
              <ReplyForm
                parent={comment}
                onCancel={() => setReplyingTo(null)}
                onSubmit={(n, t) => addReply(comment.id, n, t)}
              />
            )}
          </div>
        </div>

        {children.length > 0 && (
          <div className='ml-4 mt-3 space-y-3 border-l-2 border-gray-200 pl-4 sm:ml-9 sm:pl-5'>
            {children.map((child) => renderComment(child))}
          </div>
        )}
      </div>
    );
  };

  const topLevel = list.filter((c) => !c.parentId);

  return (
    <div>
      <h3 className='font-heading text-lg font-semibold text-gray-900'>
        Comments ({list.length})
      </h3>

      <div className='mt-5 space-y-4'>
        {topLevel.map((comment) => renderComment(comment))}

        {list.length === 0 && (
          <p className='rounded-xl border border-dashed border-gray-200 py-8 text-center text-sm text-gray-400'>
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className='mt-8 space-y-4 rounded-xl border border-gray-200 bg-white p-5'
      >
        <h4 className='font-heading text-sm font-semibold uppercase tracking-wide text-gray-500'>
          Leave a Comment
        </h4>

        <div>
          <input
            id='comment-name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Your name'
            className={fieldClass(errors.name)}
          />
          {errors.name && (
            <p className='mt-1 text-xs text-red-500'>{errors.name}</p>
          )}
        </div>

        <div>
          <textarea
            id='comment-text'
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Write your comment...'
            className={`${fieldClass(errors.text)} resize-none`}
          />
          {errors.text && (
            <p className='mt-1 text-xs text-red-500'>{errors.text}</p>
          )}
        </div>

        <button
          type='submit'
          className='rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}
