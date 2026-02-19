import Image from 'next/image';

import styles from './team-card.module.css';

type TeamCardProps = {
  imageUrl: string;
  name: string;
};

export const TeamCard = ({ imageUrl, name }: TeamCardProps) => {
  return (
    <div className='relative'>
      <div
        className={`relative border-[1px] border-slate-700 hover:scale-105 transition-all duration-500 overflow-hidden z-10 w-[320px] h-[480px] bg-slate-900 rounded-3xl drop-shadow-xl flex flex-col items-center justify-center ${styles.card}`}
      >
        <div className='absolute w-[64px] h-[64px] rounded-xl right-0 top-0 bg-cyan-500 opacity-50 z-50 blur-2xl'></div>
        {/* React logo */}
        <div className='absolute flex flex-row gap-2 right-0 top-0 p-4 bg-slate-800 z-50 rounded-tr-2xl rounded-bl-3xl shadow-xl'>
          <Image
            className='animate-pulse'
            src='/svg/react-logo.svg'
            alt='react-logo'
            width={24}
            height={24}
          />
        </div>

        {/* Profile image */}
        <div
          className={`border-[1px] border-slate-700 bg-slate-800 overflow-hidden rounded-lg w-[90%] h-[85%] mb-10 relative flex flex-col items-center justify-center ${styles.diagonalBackground}`}
        >
          <Image
            className='absolute grayscale bottom-0 object-cover w-[320px] h-[400px]'
            src={imageUrl}
            height={320}
            width={480}
            alt='react-logo'
          />
        </div>

        {/* Name */}
        <div className='absolute bottom-[8px] px-6 py-2 z-50 flex flex-row gap-2 items-center justify-between w-full'>
          <div className='w-[24px] h-[4px] bg-slate-800 rounded-full '></div>
          <label className='bg-gradient-to-r from-blue-500 via-cyan-500 to-cyan-200 inline-block text-transparent bg-clip-text text-[14px] font-bold tracking-widest uppercase'>
            {name}
          </label>
          <div className='w-[24px] h-[4px] bg-slate-800 rounded-full'></div>
        </div>

        {/* Shine */}
        <div className='absolute top-16 z-50 -rotate-45 w-[1000px] h-[200px] bg-white opacity-[2.5%]' />
      </div>
      <div className='bg-purple-600 w-[80%] left-[10%] blur-2xl h-[90%] opacity-50 absolute top-10 z-0'></div>
    </div>
  );
};
