import { mapEmbedUrl } from '@/data/contact';

export default function MapEmbed() {
  return (
    <section
      aria-label='Our location'
      className='mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2'
    >
      <iframe
        src={mapEmbedUrl}
        title='Purple BD — House 35, Road 5, H Block, Aftabnagar, Dhaka'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        allowFullScreen
        className='block h-80 w-full rounded-xl border-0 md:h-96'
      />
    </section>
  );
}
