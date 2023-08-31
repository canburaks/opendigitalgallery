import { Container } from '@mui/material';
import { LinkComponent } from '@/components';
import { motion } from 'framer-motion';
import { PolicyNode, PolicyType } from '@/types';

type Props = {
  policies: PolicyNode[];
};

export function PoliciesView({ policies }: Props) {
  return (
    <div>
      <Container>
        <Container>
          {policies.length > 0 && (
            <section className="mt-8">
              <div className="mb-32 w-full flex flex-col items-center">
                {policies.map(({ node }: { node: PolicyType }) => (
                  <PolicyCard policy={node} key={`post-${node.slug}`} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </Container>
    </div>
  );
}

export function PolicyCard({ policy }: { policy: PolicyType }) {
  return (
    <Container className="w-full flex flex-col items-center relative">
      <Container className="flex-col max-w-[720px]">
        <motion.div className="top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-end p-4  rounded-md">
          <motion.h3 className="text-gray-700 text-center">
            <LinkComponent href={`/policy/${policy.slug}`} className="text-gray-700 no-underline">
              {policy.title}
            </LinkComponent>
          </motion.h3>
        </motion.div>
      </Container>
    </Container>
  );
}
