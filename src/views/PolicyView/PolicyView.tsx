import { Container } from '@mui/material';
import { PolicyType } from '@/types';
import { HeadlineX } from '@/components';

type Props = {
  policy: PolicyType;
};

export function PolicyView({ policy }: Props) {
  return (
    <Container className="mt-16 w-full flex flex-col items-center">
      <Container className="flex-col max-w-[720px]">
        <article className="mb-40 blog-post">
          <header className="my-4 flex flex-col items-center">
            <HeadlineX className="text-center !text-6xl font-black tracking-tighter leading-tight mb-1">
              {policy.title}
            </HeadlineX>
            <div className="flex flex-col justify-center items-center">
              <div
                className="my-4 text-gray-800 text-stretch"
                dangerouslySetInnerHTML={{ __html: policy.content }}
              />
            </div>
          </header>
          <div
            className="my-8 text-gray-800"
            dangerouslySetInnerHTML={{ __html: policy.content! }}
          />
        </article>
      </Container>
    </Container>
  );
}
