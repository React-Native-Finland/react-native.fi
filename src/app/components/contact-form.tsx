import { BuildingOffice2Icon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const ContactForm = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>(
    'idle',
  );

  return (
    <div className='relative isolate bg-white'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2'>
        <div className='relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48'>
          <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg'>
            <div className='absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2'>
              <svg
                aria-hidden='true'
                className='absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
              >
                <defs>
                  <pattern
                    x='100%'
                    y={-1}
                    id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
                    width={200}
                    height={200}
                    patternUnits='userSpaceOnUse'
                  >
                    <path d='M130 200V.5M.5 .5H200' fill='none' />
                  </pattern>
                </defs>
                <rect fill='white' width='100%' height='100%' strokeWidth={0} />
                <svg x='100%' y={-1} className='overflow-visible fill-gray-50'>
                  <path d='M-470.5 0h201v201h-201Z' strokeWidth={0} />
                </svg>
                <rect
                  fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)'
                  width='100%'
                  height='100%'
                  strokeWidth={0}
                />
              </svg>
            </div>
            <h2 className='text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>
              Get in touch
            </h2>
            <p className='mt-6 text-lg/8 text-gray-600'>
              Let's discuss how we can help you create an exceptional mobile
              experience for your users. Whether you need a new app or want to
              improve an existing one, we're here to help.
            </p>
            <dl className='mt-10 space-y-4 text-base/7 text-gray-600'>
              <div className='flex gap-x-4'>
                <dt className='flex-none'>
                  <span className='sr-only'>Address</span>
                  <BuildingOffice2Icon
                    aria-hidden='true'
                    className='h-7 w-6 text-gray-400'
                  />
                </dt>
                <dd>Helsinki, Finland</dd>
              </div>
              <div className='flex gap-x-4'>
                <dt className='flex-none'>
                  <span className='sr-only'>Email</span>
                  <EnvelopeIcon
                    aria-hidden='true'
                    className='h-7 w-6 text-gray-400'
                  />
                </dt>
                <dd>
                  <a
                    href='mailto:hello@react-native.fi'
                    className='hover:text-gray-900'
                  >
                    hello@react-native.fi
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {formStatus === 'idle' ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              try {
                const response = await fetch('/api/email', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    firstName: formData.get('first-name'),
                    lastName: formData.get('last-name'),
                    email: formData.get('email'),
                    message: formData.get('message'),
                  }),
                });

                if (!response.ok) {
                  throw new Error('Failed to send email');
                }

                setFormStatus('success');
              } catch {
                setFormStatus('error');
              }
            }}
            className='px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48'
          >
            <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
              <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='first-name'
                    className='block text-sm/6 font-semibold text-gray-900'
                  >
                    First name
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='text'
                      name='first-name'
                      id='first-name'
                      required
                      autoComplete='given-name'
                      className='block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='last-name'
                    className='block text-sm/6 font-semibold text-gray-900'
                  >
                    Last name
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='text'
                      name='last-name'
                      id='last-name'
                      required
                      autoComplete='family-name'
                      className='block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='email'
                    className='block text-sm/6 font-semibold text-gray-900'
                  >
                    Email
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      required
                      autoComplete='email'
                      className='block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='message'
                    className='block text-sm/6 font-semibold text-gray-900'
                  >
                    Message
                  </label>
                  <div className='mt-2.5'>
                    <textarea
                      name='message'
                      id='message'
                      required
                      minLength={10}
                      rows={4}
                      className='block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
                      defaultValue=''
                    />
                  </div>
                </div>
              </div>
              <div className='mt-8 flex justify-end'>
                <button
                  type='submit'
                  className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Send message
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className='px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48'>
            <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
              {formStatus === 'success' ? (
                <div className='text-center'>
                  <h3 className='text-2xl font-semibold text-gray-900'>
                    Thank you for your message!
                  </h3>
                  <p className='mt-4 text-lg text-gray-600'>
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <div className='text-center'>
                  <h3 className='text-2xl font-semibold text-gray-900'>
                    Oops! Something went wrong.
                  </h3>
                  <p className='mt-4 text-lg text-gray-600'>
                    Please try contacting us directly at{' '}
                    <a
                      href='mailto:hello@react-native.fi'
                      className='text-indigo-600 hover:text-indigo-500'
                    >
                      hello@react-native.fi
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
