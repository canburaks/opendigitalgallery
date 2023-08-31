import { motion } from 'framer-motion';
import { SegmentedControl, BodyXS } from '@/components';

type Props = {
  value: boolean | string;
  title: string;
  description: string;
  handler: (val: boolean | string) => void;
};

export const MatSelection = ({ value, handler, title, description }: Props) => {
  return (
    <motion.div className="w-full flex flex-col mb-6">
      <h4 className="flex flex-row text-base font-bold">{title}</h4>
      <BodyXS className="mb-1 text-gray-700">{description}</BodyXS>
      <SegmentedControl
        data={[
          { label: 'Yes', value: 'true' },
          { label: 'No', value: '' },
        ]}
        value={value}
        // @ts-ignore
        onChange={handler}
      />
    </motion.div>
  );
};
