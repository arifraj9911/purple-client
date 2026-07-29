export default function Home() {
  return (
    <main className='flex flex-1 flex-col'>
      {/* Hero / Welcome Section */}
      <section className='flex flex-1 flex-col items-center justify-center bg-gray-50 px-6 py-20'>
        <h1 className='text-primary mb-4 text-center'>
          Hello, Welcome to Purple BD
        </h1>

        <p className='max-w-lg text-center text-lg text-gray-700'>
          Your one-stop destination for authentic handicrafts &amp; art supplies
          in Bangladesh.
        </p>

        <div className='mt-8 h-1 w-20 rounded-full bg-primary' />

        {/* Font & Color Verification */}
        <div className='mt-10 space-y-2 text-center'>
          <p className='font-heading text-lg font-semibold text-gray-900'>
            This is Poppins (Heading Font)
          </p>
          <p className='font-body text-gray-700'>This is Inter (Body Font)</p>
        </div>

        <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
          {[
            { label: 'Primary', color: 'bg-primary' },
            { label: 'Primary Dark', color: 'bg-primary-dark' },
            { label: 'Primary Light', color: 'bg-primary-light' },
            { label: 'Secondary', color: 'bg-secondary' },
            { label: 'Accent', color: 'bg-accent' },
            { label: 'Sale', color: 'bg-sale-badge' },
          ].map((swatch) => (
            <div
              key={swatch.label}
              className='flex flex-col items-center gap-1'
            >
              <div className={`h-10 w-10 rounded-lg ${swatch.color}`} />
              <span className='text-small text-gray-500'>{swatch.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
