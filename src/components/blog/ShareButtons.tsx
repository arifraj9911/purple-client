'use client';

import { useState } from 'react';
import { FiCheck, FiLink } from 'react-icons/fi';
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const share = (network: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);

    const links: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    window.open(links[network], '_blank', 'noopener,noreferrer');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore clipboard errors */
    }
  };

  const networks: { id: string; label: string; icon: IconType }[] = [
    { id: 'facebook', label: 'Share on Facebook', icon: FaFacebookF },
    { id: 'twitter', label: 'Share on Twitter', icon: FaTwitter },
    { id: 'whatsapp', label: 'Share on WhatsApp', icon: FaWhatsapp },
    { id: 'linkedin', label: 'Share on LinkedIn', icon: FaLinkedinIn },
  ];

  return (
    <div className='flex items-center gap-2'>
      <span className='mr-1 text-sm font-medium text-gray-500'>Share:</span>

      {networks.map((network) => {
        const Icon = network.icon;
        return (
          <button
            key={network.id}
            type='button'
            onClick={() => share(network.id)}
            aria-label={network.label}
            className='flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:bg-primary hover:text-white'
          >
            <Icon className='h-3.5 w-3.5' />
          </button>
        );
      })}

      <button
        type='button'
        onClick={copyLink}
        aria-label='Copy link'
        className='flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:bg-primary hover:text-white'
      >
        {copied ? (
          <FiCheck className='h-3.5 w-3.5 text-accent' />
        ) : (
          <FiLink className='h-3.5 w-3.5' />
        )}
      </button>
    </div>
  );
}
