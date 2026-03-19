import Image from 'next/image';
import Link from 'next/link';

interface AuthorBioProps {
  author:
    | string
    | {
        name: string;
        role: string;
        href: string;
        imageUrl: string;
      };
  locale: string;
}

export function AuthorBio({ author, locale }: AuthorBioProps) {
  if (typeof author === 'string') return null;

  return (
    <div className='mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6'>
      <div className='flex items-start gap-4'>
        {author.imageUrl && (
          <Image
            src={author.imageUrl}
            alt={author.name}
            width={64}
            height={64}
            className='rounded-full object-cover'
          />
        )}
        <div>
          <p className='text-sm font-medium text-gray-500'>
            {locale === 'fi' ? 'Kirjoittaja' : 'Written by'}
          </p>
          <Link
            href={author.href as '/events' | '/articles' | '/developers'}
            className='text-lg font-semibold text-gray-900 hover:text-indigo-600'
          >
            {author.name}
          </Link>
          {author.role && (
            <p className='mt-1 text-sm text-gray-600'>{author.role}</p>
          )}
        </div>
      </div>
    </div>
  );
}
