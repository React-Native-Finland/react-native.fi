import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "What's your approach to React Native development?",
    answer:
      'We follow a modern, performance-first approach using TypeScript and the latest React Native features. Our development process emphasizes clean architecture, automated testing, and continuous delivery to ensure high-quality apps that are maintainable and scalable.',
  },
  {
    question: 'Can you help with existing React Native projects?',
    answer:
      'Yes, we specialize in both new development and improving existing React Native applications. Whether you need performance optimization, architecture improvements, or feature additions, we can analyze your codebase and implement effective solutions.',
  },
  {
    question: 'How do you handle native functionality in React Native?',
    answer:
      'We have extensive experience with native modules and bridging in React Native. When needed, we can develop custom native modules for iOS and Android, integrate third-party SDKs, and ensure smooth communication between JavaScript and native code.',
  },
  {
    question: "What's included in your React Native consulting?",
    answer:
      'Our consulting services cover technical architecture design, code reviews, performance optimization, team training, and development strategy. We can either lead the entire development process or work alongside your existing team to improve development practices and outcomes.',
  },
  {
    question: 'How do you ensure app quality and performance?',
    answer:
      'We implement comprehensive testing strategies including unit tests, integration tests, and E2E testing. We use performance monitoring tools and follow React Native best practices for optimization. Regular code reviews and CI/CD pipelines help maintain high code quality.',
  },
  {
    question: 'What kind of timeline can we expect for our project?',
    answer:
      'Project timelines vary based on complexity, but we typically work in 2-week sprints with regular deliverables. We provide detailed project planning and maintain transparent communication throughout the development process to ensure timely delivery.',
  },
];

export const FaqSection = () => {
  return (
    <div className='bg-gray-900'>
      <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
            Common Questions About React Native Development
          </h2>
          <dl className='mt-16 divide-y divide-white/10'>
            {faqs.map((faq) => (
              <Disclosure
                key={faq.question}
                as='div'
                className='py-6 first:pt-0 last:pb-0'
              >
                <dt>
                  <DisclosureButton className='group flex w-full items-start justify-between text-left text-white'>
                    <span className='text-base/7 font-semibold'>
                      {faq.question}
                    </span>
                    <span className='ml-6 flex h-7 items-center'>
                      <PlusSmallIcon
                        aria-hidden='true'
                        className='size-6 group-data-[open]:hidden'
                      />
                      <MinusSmallIcon
                        aria-hidden='true'
                        className='size-6 group-[&:not([data-open])]:hidden'
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as='dd' className='mt-2 pr-12'>
                  <p className='text-base/7 text-gray-300'>{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
