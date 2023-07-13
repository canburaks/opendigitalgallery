import React, { FC } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Body } from '@/components';
import cx from 'classnames';

interface BreadcumbsUIProps {
  activeIndex: number | null;
}

const formList = ['Contact', 'Address', 'Shipping', 'Payment'];
export const BreadcumbsUI: FC<BreadcumbsUIProps> = ({ activeIndex }) => {
  if (activeIndex === null) {
    return null;
  }

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className="py-2"
    >
      {formList.map((form, index) => (
        <Body
          key={form}
          className={cx({
            '!font-bold': index === activeIndex,
          })}
        >
          {form}
        </Body>
      ))}
    </Breadcrumbs>
  );
};
