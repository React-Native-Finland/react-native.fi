'use client';

import { useTranslations } from 'next-intl';

type FAQItem = {
  question: string;
  answer: string;
};

export function FAQSection() {
  const t = useTranslations('home.faq');

  // Get FAQ items from translations
  const faqItems: FAQItem[] = [
    {
      question: t('questions.0.question'),
      answer: t('questions.0.answer'),
    },
    {
      question: t('questions.1.question'),
      answer: t('questions.1.answer'),
    },
    {
      question: t('questions.2.question'),
      answer: t('questions.2.answer'),
    },
    {
      question: t('questions.3.question'),
      answer: t('questions.3.answer'),
    },
  ];

  // Generate FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className='bg-white py-24 sm:py-32'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
            {t('title')}
          </h2>
          <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
            {faqItems.map((item, index) => (
              <div key={index} className='pt-6 first:pt-0'>
                <dt className='text-base font-semibold text-gray-900'>
                  {item.question}
                </dt>
                <dd className='mt-2 text-base text-gray-600'>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
