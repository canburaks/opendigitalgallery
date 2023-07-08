import { CircularProgress, Dialog } from '@mui/material';

export const LoadingDialog = () => {
  return (
    <Dialog open={true}>
      <div className="flex items-center justify-center w-full p-5">
        <CircularProgress />
      </div>
    </Dialog>
  );
};
