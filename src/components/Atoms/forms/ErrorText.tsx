import cx from 'classnames';

interface Props {
  error: string | null | undefined;
  className?: string;
}

export const ErrorText: React.FC<Props> = ({ error, className }) => {
  if (!error) {
    return null;
  }

  return <p className={cx('text-left text-muiError text-[12px]', className)}>{error}</p>;
};
