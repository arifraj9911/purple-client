/**
 * Contact Us dummy data (article 4.13).
 * Swap these constants for CMS/API content later.
 */

export const ADDRESS = 'House 35, Road 5, H Block, Aftabnagar, Dhaka';

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS,
)}&output=embed`;

export const contactInfo = {
  address: ADDRESS,
  phone: '017xxxxxxxxx',
  email: 'support@purplebd.com',
};

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com' },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/8801712345678' },
];
