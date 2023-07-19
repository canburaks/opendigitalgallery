import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  Divider,
  DialogProps,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { ImageWithFallback } from '../Atoms';

type Props = {
  title?: string;
  onClose?: () => void;
  open: boolean;
  closeIcon?: boolean;
  closeButton?: boolean;
  buttons?: React.ReactElement;
  disableScrollLock?: boolean;
} & DialogProps;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CommonDialog: React.FC<PropsWithChildren<Props>> = ({
  open,
  onClose,
  title,
  children,
  buttons,
  closeButton,
  closeIcon,
  disableScrollLock,
  ...rest
}) => {
  return (
    <Dialog
      {...rest}
      disableScrollLock={disableScrollLock}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      disableEscapeKeyDown
    >
      <DialogTitle>{title}</DialogTitle>
      {title && <Divider />}
      <DialogContent>
        {closeIcon && (
          <div className="mb-5">
            <Button className="absolute right-3 top-3" onClick={onClose}>
              <ImageWithFallback src="/icons/closePurpleIcon.svg" alt="close icon" />
            </Button>
          </div>
        )}
        {children}
      </DialogContent>
      {(closeButton || buttons) && <Divider />}
      <DialogActions>
        {closeButton && <Button onClick={onClose}>Close</Button>}
        {buttons && buttons}
      </DialogActions>
    </Dialog>
  );
};
