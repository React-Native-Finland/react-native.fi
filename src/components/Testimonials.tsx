'use client';

// Type for testimonial data - you can expand this as needed
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  imageUrl?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

/**
 * Testimonials component for displaying community feedback
 *
 * Usage:
 * 1. Add testimonial data to your translation files or pass directly
 * 2. Import and use this component on any page
 *
 * Example:
 * ```tsx
 * <Testimonials
 *   testimonials={[
 *     {
 *       quote: "The React Native Helsinki meetups are fantastic...",
 *       author: "John Doe",
 *       role: "Senior Developer",
 *       company: "Acme Inc"
 *     }
 *   ]}
 * />
 * ```
 */
export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
            What the Community Says
          </h2>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='flex flex-col rounded-2xl bg-gray-50 p-8'
            >
              <blockquote className='flex-grow'>
                <p className='text-lg text-gray-600'>{testimonial.quote}</p>
              </blockquote>
              <div className='mt-6 flex items-center gap-4'>
                {testimonial.imageUrl ? (
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.author}
                    className='h-12 w-12 rounded-full object-cover'
                  />
                ) : (
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold'>
                    {testimonial.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className='font-semibold text-gray-900'>
                    {testimonial.author}
                  </p>
                  <p className='text-sm text-gray-500'>
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialsWithCTAProps {
  testimonials: Testimonial[];
  title?: string;
  contributeTitle?: string;
  contributeDescription?: string;
  contributeButtonText?: string;
  contributeUrl?: string;
}

/**
 * Testimonials component with a call-to-action for contributing
 */
export function TestimonialsWithCTA({
  testimonials,
  title = 'What the Community Says',
  contributeTitle = 'Share Your Experience',
  contributeDescription = "Attended a meetup? Found our tutorials helpful? We'd love to hear from you.",
  contributeButtonText = 'Share your testimonial',
  contributeUrl = 'https://github.com/React-Native-Finland/react-native.fi/discussions',
}: TestimonialsWithCTAProps) {
  return (
    <section className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
            {title}
          </h2>
        </div>

        {testimonials.length > 0 && (
          <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3'>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className='flex flex-col rounded-2xl bg-gray-50 p-8'
              >
                <blockquote className='flex-grow'>
                  <p className='text-lg text-gray-600'>{testimonial.quote}</p>
                </blockquote>
                <div className='mt-6 flex items-center gap-4'>
                  {testimonial.imageUrl ? (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.author}
                      className='h-12 w-12 rounded-full object-cover'
                    />
                  ) : (
                    <div className='flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold'>
                      {testimonial.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className='font-semibold text-gray-900'>
                      {testimonial.author}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {testimonial.role}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contribute CTA */}
        <div className='mx-auto mt-16 max-w-xl rounded-2xl border border-indigo-100 bg-indigo-50/50 p-8 text-center'>
          <h3 className='text-lg font-semibold text-gray-900'>
            {contributeTitle}
          </h3>
          <p className='mt-2 text-sm text-gray-600'>{contributeDescription}</p>
          <a
            href={contributeUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500'
          >
            {contributeButtonText}
            <svg
              className='ml-2 size-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Placeholder component to show when no testimonials are available yet
 * This can be used during development or when collecting testimonials
 */
export function TestimonialsPlaceholder() {
  return (
    <section className='bg-gray-50 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
            What the Community Says
          </h2>
          <p className='mt-6 text-lg text-gray-600'>
            We're collecting feedback from our community. Check back soon for
            testimonials from developers who've attended our meetups and used
            our resources.
          </p>
          <div className='mt-10'>
            <a
              href='https://meetup.com/react-native-helsinki'
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Join the community <span aria-hidden='true'>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
