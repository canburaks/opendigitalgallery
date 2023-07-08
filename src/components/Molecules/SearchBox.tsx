import { Drawer, IconButton, TextField } from '@mui/material';
import React, { useState, Dispatch, SetStateAction, FC, KeyboardEvent, useEffect } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import { Loading } from '../Atoms';

interface SearchBoxProps {
  className?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchBox: FC<SearchBoxProps> = ({ open, setOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSearch = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setLoading(true);
      router.push('/products?search=' + searchTerm);
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(false);
      setOpen(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, setOpen]);

  return (
    <div className="flex items-center flex-1">
      <IconButton onClick={() => setOpen(true)}>
        <SearchOutlinedIcon />
      </IconButton>
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <div className="h-30 flex justify-center items-center">
          <TextField
            placeholder="Search"
            className="border-black text-black w-100 "
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: <SearchOutlinedIcon />,
              onKeyPress: onSearch,
            }}
          />
          <IconButton onClick={() => setOpen(false)} className="ml-2">
            <CloseIcon />
          </IconButton>
        </div>
        {loading && <Loading />}
      </Drawer>
    </div>
  );
};
