import { HeadlineS, Body } from '@/components';
import { useTranslation } from 'next-i18next';
import { TRX } from '@/constants';

type Props = {
  message?: string;
};

export const OrderFail = (props: Props) => {
  const { t } = useTranslation('common');

  return (
    <div>
      <HeadlineS>{t(TRX.ORDER.FAILED_MESSAGE)}</HeadlineS>
      <Body>{props.message || ''}</Body>
    </div>
  );
};
