import type { IconType } from 'react-icons';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { contactInfo, socialLinks } from '@/data/contact';

const SOCIAL_ICONS: Record<string, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
};

export default function ContactInfo() {
  return (
    <div className='rounded-2xl border border-gray-300 bg-white p-5 sm:p-6'>
      <h2 className='font-heading text-lg font-semibold text-gray-900'>
        Get in Touch
      </h2>
      <p className='mt-1 text-sm text-gray-500'>
        Questions, feedback or custom orders — we&apos;re here to help.
      </p>

      <ul className='mt-6 space-y-4'>
        {/* Address */}
        <li className='flex items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary'>
            <FiMapPin className='h-5 w-5' />
          </span>
          <div>
            <p className='text-sm font-semibold text-gray-900'>Address</p>
            <p className='text-sm leading-relaxed text-gray-500'>
              {contactInfo.address}
            </p>
          </div>
        </li>

        {/* Phone */}
        <li className='flex items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary'>
            <FiPhone className='h-5 w-5' />
          </span>
          <div>
            <p className='text-sm font-semibold text-gray-900'>Mobile</p>
            <p className='text-sm text-gray-500'>{contactInfo.phone}</p>
          </div>
        </li>

        {/* Email */}
        <li className='flex items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary'>
            <FiMail className='h-5 w-5' />
          </span>
          <div>
            <p className='text-sm font-semibold text-gray-900'>Email</p>
            <a
              href={`mailto:${contactInfo.email}`}
              className='text-sm text-gray-500 transition-colors hover:text-primary'
            >
              {contactInfo.email}
            </a>
          </div>
        </li>
      </ul>

      <div className='mt-6 border-t border-gray-100 pt-5'>
        <p className='text-sm font-semibold text-gray-900'>Follow Us</p>
        <div className='mt-3 flex gap-2'>
          {socialLinks.map((link) => {
            const Icon = SOCIAL_ICONS[link.id];
            return (
              <a
                key={link.id}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={link.label}
                className='flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:bg-primary hover:text-white'
              >
                <Icon className='h-4 w-4' />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
