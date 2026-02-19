import Image from 'next/image';

import styles from './companies-section.module.css';

const companies = [
  {
    name: 'Noice',
    src: '/svg/noice.svg',
    width: 50,
    height: 50,
  },
  {
    name: 'Slush',
    src: '/svg/slush.svg',
    width: 100,
    height: 100,
  },
  {
    name: 'Futurice',
    src: '/svg/futurice.svg',
    width: 100,
    height: 100,
  },
  {
    name: 'Veri',
    src: '/svg/veri.svg',
    width: 64,
    height: 64,
  },
  {
    name: 'Posti',
    src: '/svg/posti.svg',
    width: 80,
    height: 80,
  },
  {
    name: 'Adidas',
    src: '/svg/adidas.svg',
    width: 150,
    height: 20,
  },
  {
    name: 'Fingrid',
    src: '/svg/fingrid.svg',
    width: 100,
    height: 100,
  },
  {
    name: 'Yle',
    src: '/svg/yle.svg',
    width: 100,
    height: 100,
  },
];

export const CompaniesSection = () => {
  return (
    <div className='flex flex-col items-center justify-center py-32'>
      <h2 className='text-balance text-3xl font-semibold tracking-tight text-gray-900 text-center'>
        Companies we've worked with
      </h2>
      <div className='relative w-[520px] overflow-hidden'>
        <div
          style={{
            position: 'absolute',
            left: 0,
            zIndex: 10,
            height: '100%',
            width: '96px',
            background: 'linear-gradient(to right, white, transparent)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 10,
            height: '100%',
            width: '96px',
            background: 'linear-gradient(to left, white, transparent)',
            pointerEvents: 'none',
          }}
        />
        <div className={`${styles.scrollContainer} flex flex-row gap-12 py-8`}>
          {companies.map((company) => (
            <Image
              key={company.name}
              src={company.src}
              alt={company.name}
              width={company.width}
              height={company.height}
            />
          ))}
          {/* Duplicate set */}
          {companies.map((company) => (
            <Image
              key={company.name + '-duplicate'}
              src={company.src}
              alt={company.name}
              width={company.width}
              height={company.height}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
