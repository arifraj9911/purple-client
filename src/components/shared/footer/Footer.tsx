import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { FiFeather } from 'react-icons/fi';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Products', href: '/products' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

const CUSTOMER_SERVICE = [
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Returns & Refund', href: '/returns' },
  { label: 'FAQ', href: '/faq' },
];

export default function Footer() {
  return (
    <footer className='bg-secondary text-gray-300 pb-16 lg:pb-0'>
      {/* =============================================
           MAIN CONTENT — 4-column grid
           Mobile: 1 col → Tablet: 2 cols → Desktop: 4 cols
           ============================================= */}
      <div className='container mx-auto px-4 md:px-6 lg:px-8 pt-12 pb-8 md:py-14'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-6'>
          {/* ===== COL A: About Us (30%) ===== */}
          <div className='space-y-4'>
            {/* Logo */}
            <Link
              href='/'
              className='inline-flex items-center gap-1.5 font-heading text-2xl font-bold text-white'
            >
              <FiFeather className='h-7 w-7 text-primary' />
              <span className='text-primary'>Purple</span> BD
            </Link>

            {/* Description */}
            <p className='text-sm leading-relaxed text-gray-400 md:max-w-[75%]'>
              Your one-stop destination for authentic handicrafts, art supplies,
              and creative materials in Bangladesh. We bring the finest quality
              products to your doorstep.
            </p>

            {/* Social Icons */}
            <div className='flex items-center gap-3 pt-2'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-[#1877F2] hover:text-white'
                aria-label='Facebook'
              >
                <FaFacebook className='h-4 w-4' />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-[#E4405F] hover:text-white'
                aria-label='Instagram'
              >
                <FaInstagram className='h-4 w-4' />
              </a>
              <a
                href='https://youtube.com'
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-[#FF0000] hover:text-white'
                aria-label='YouTube'
              >
                <FaYoutube className='h-4 w-4' />
              </a>
              <a
                href='https://wa.me/8801700000000'
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-[#25D366] hover:text-white'
                aria-label='WhatsApp'
              >
                <FaWhatsapp className='h-4 w-4' />
              </a>
            </div>
          </div>

          {/* ===== COL B: Quick Links (23%) ===== */}
          <div className='space-y-4'>
            <h3 className='font-heading text-base font-semibold text-white'>
              Quick Links
            </h3>
            <ul className='space-y-2.5'>
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-gray-400 transition-colors hover:text-primary'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== COL C: Customer Service (23%) ===== */}
          <div className='space-y-4'>
            <h3 className='font-heading text-base font-semibold text-white'>
              Service
            </h3>
            <ul className='space-y-2.5'>
              {CUSTOMER_SERVICE.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-gray-400 transition-colors hover:text-primary'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== COL D: Contact Info (24%) ===== */}
          <div className='space-y-4'>
            <h3 className='font-heading text-base font-semibold text-white'>
              Contact Info
            </h3>
            <ul className='space-y-3'>
              {/* Address */}
              <li className='flex items-start gap-3 text-sm text-gray-400'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mt-0.5 h-4 w-4 shrink-0 text-primary'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
                <span>123, Purana Paltan, Dhaka-1000, Bangladesh</span>
              </li>

              {/* Phone */}
              <li>
                <a
                  href='tel:+8801700000000'
                  className='flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-primary'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 shrink-0 text-primary'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                    />
                  </svg>
                  <span>017XX-XXXXXX</span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href='mailto:info@purplebd.com'
                  className='flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-primary'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 shrink-0 text-primary'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                  <span>info@purplebd.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =============================================
           BOTTOM BAR
           ============================================= */}
      <div className='border-t border-gray-700/60'>
        <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:px-6 lg:px-8 py-5 md:flex-row'>
          {/* Copyright */}
          <p className='text-center text-sm text-gray-500'>
            &copy; {new Date().getFullYear()}{' '}
            <span className='text-primary'>Purple</span> BD. All rights
            reserved.
          </p>

          {/* Payment Icons */}
          <div className='flex items-center gap-3'>
            <span className='rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-400'>
              bKash
            </span>
            <span className='rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-400'>
              Visa
            </span>
            <span className='rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-400'>
              MasterCard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
