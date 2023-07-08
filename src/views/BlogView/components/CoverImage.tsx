import cn from 'classnames';
import Image from 'next/image';
import { LinkComponent } from '@/components';

interface Props {
  title: string;
  coverImage: {
    node: {
      sourceUrl: string;
    };
  };
  slug?: string;
}

export function CoverImage({ title, coverImage, slug }: Props) {
  const image = (
    <Image
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <LinkComponent href={`/posts/${slug}`} aria-label={title}>
          {image}
        </LinkComponent>
      ) : (
        image
      )}
    </div>
  );
}
