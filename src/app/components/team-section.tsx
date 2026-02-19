import { TeamCard } from '@/app/components/team-card';

const people = [
  {
    name: 'Perttu Lähteenlahti',
    role: 'React Native Developer',
    imageUrl: '/images/perttu-no-background.png',
    bio: 'Experienced React Native developer with a strong background in mobile app development and user experience design. Specializing in creating performant cross-platform applications with modern JavaScript and TypeScript.',
    xUrl: 'https://twitter.com/plahteenlahti',
    linkedinUrl: 'https://www.linkedin.com/in/plahteenlahti/',
  },
  {
    name: 'Tobias Helsing',
    role: 'React Native Developer',
    imageUrl: '/images/tobias-no-background.png',
    bio: 'Expert React Native developer focused on building scalable mobile applications. Deep expertise in building custom native modules & great visual user experiences.',
    xUrl: '',
    linkedinUrl: 'https://www.linkedin.com/in/tobias-helsing/',
  },
];

export const TeamSection = () => {
  return (
    <div className='bg-white py-24 md:py-32'>
      <div className='mx-auto flex flex-col items-center gap-10'>
        <div className='max-w-2xl xl:col-span-2 mb-10'>
          <h2
            id='team'
            className='text-pretty text-4xl text-center font-semibold tracking-tight text-gray-900 sm:text-5xl'
          >
            Meet the Developers
          </h2>
          <p className='mt-6 text-lg/8 text-gray-600 text-center'>
            We are experienced React Native developers based in Finland,
            dedicated to creating exceptional mobile applications for businesses
            worldwide.
          </p>
        </div>
        <ul
          role='list'
          className='flex flex-col items-center gap-10 lg:flex-row lg:items-center'
        >
          {people.map((person) => (
            <div className='flex flex-col items-center' key={person.name}>
              <TeamCard
                key={person.name}
                imageUrl={person.imageUrl}
                name={person.name}
              />

              <div className='mt-6 max-w-[320px] text-center'>
                <p className='text-base text-gray-600'>{person.bio}</p>
              </div>

              <ul role='list' className='mt-6 flex gap-x-6'>
                {!!person.xUrl && (
                  <li>
                    <a
                      href={person.xUrl}
                      className='text-slate-900 hover:text-slate-600'
                      target='_blank'
                    >
                      <span className='sr-only'>X</span>
                      <svg
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        aria-hidden='true'
                        className='size-5'
                      >
                        <path d='M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z' />
                      </svg>
                    </a>
                  </li>
                )}
                {!!person.linkedinUrl && (
                  <li>
                    <a
                      href={person.linkedinUrl}
                      className='text-slate-900 hover:text-slate-600'
                      target='_blank'
                    >
                      <span className='sr-only'>LinkedIn</span>
                      <svg
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        aria-hidden='true'
                        className='size-5'
                      >
                        <path
                          d='M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z'
                          clipRule='evenodd'
                          fillRule='evenodd'
                        />
                      </svg>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
