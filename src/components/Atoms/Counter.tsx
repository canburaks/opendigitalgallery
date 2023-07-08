import { Button, ButtonGroup } from '@mui/material';
import React, { FC } from 'react';
import { Body } from './Typographies';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface CounterProps {
  onIncrease: () => void;
  onReduce: () => void;
  quantity: number;
  className?: string;
}

export const Counter: FC<CounterProps> = ({ onReduce, onIncrease, quantity, className }) => {
  return (
    <div className={className}>
      <ButtonGroup className="border-1 border-solid border-gray-300">
        <Button aria-label="reduce" onClick={onReduce}>
          <RemoveIcon fontSize="small" />
        </Button>
        <Body className="w-8 text-center py-1">{quantity}</Body>

        <Button aria-label="increase" onClick={onIncrease}>
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </div>
  );
};
