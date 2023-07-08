import React, { useState } from 'react';
import { Body, BodyS, Divider } from '../Atoms';
import {
  Button,
  Checkbox,
  Drawer,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';

export const FilterTab = () => {
  const [artPrintAnchor, setArtPrintAnchor] = useState<null | HTMLElement>(null);
  const [priceAnchor, setPriceAnchor] = useState<null | HTMLElement>(null);
  const [mobileDrawer, setMobileDrawer] = useState(false);

  const handleArtPrintClose = () => {
    setArtPrintAnchor(null);
  };

  const handlePriceClose = () => {
    setPriceAnchor(null);
  };

  return (
    <div>
      <div className="justify-between hidden break950:flex">
        {/* Filtre */}
        <div className="flex gap-4 items-center">
          <Body>Filtre:</Body>
          <Button
            onClick={(e) => setArtPrintAnchor(e.currentTarget)}
            className="font-[unset] font-light flex items-center "
            variant="text"
          >
            <Body>Stok Durumu</Body>
            {artPrintAnchor ? (
              <KeyboardArrowUpIcon className="ml-2 font-light text-[30px]" />
            ) : (
              <KeyboardArrowDownIcon className="ml-2 font-light text-[30px]" />
            )}
          </Button>

          <Button
            onClick={(e) => setPriceAnchor(e.currentTarget)}
            className="font-[unset] font-light flex items-center "
            variant="text"
          >
            <Body>Price</Body>
            {priceAnchor ? (
              <KeyboardArrowUpIcon className="ml-2 font-light text-[30px]" />
            ) : (
              <KeyboardArrowDownIcon className="ml-2 font-light text-[30px]" />
            )}
          </Button>
        </div>

        {/* Sıralama */}
        <div className="flex gap-4 items-center">
          <Body>Sıralama Ölçütü:</Body>
          <Select className="min-w-60" size="small">
            <MenuItem key={'1'} value={'1'}>
              Öne Çıkan
            </MenuItem>

            <MenuItem key={'2'} value={'2'}>
              Fiyat, düşükten yükseğe
            </MenuItem>
            <MenuItem key={'3'} value={'2'}>
              Fiyat, yüksekten düşüğe
            </MenuItem>
          </Select>
          <Body>10 Ürün</Body>
        </div>
      </div>

      {/*  Stok Menu */}
      <Menu anchorEl={artPrintAnchor} open={Boolean(artPrintAnchor)} onClose={handleArtPrintClose}>
        <div className="w-80">
          <div className="flex justify-between px-6 pb-3 py-2 items-center">
            <BodyS>0 Seçildi</BodyS>
            <Button variant="text">Sıfırla</Button>
          </div>
          <Divider direction={'horizontal'} />
          <div className="px-6 py-6 flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Checkbox className="p-0" />
              <BodyS>Stokta (10)</BodyS>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox className="p-0" />
              <BodyS>Stokta yok (0)</BodyS>
            </div>
          </div>
        </div>
      </Menu>

      {/* Price Menu */}
      <Menu anchorEl={priceAnchor} open={Boolean(priceAnchor)} onClose={handlePriceClose}>
        <div className="w-80">
          <div className="flex justify-between px-6 pb-3 py-2 items-center">
            <BodyS>En yüksek fiyat: 200 TL</BodyS>
            <Button variant="text">Sıfırla</Button>
          </div>
          <Divider direction={'horizontal'} />
          <div className="px-6 py-6 flex gap-3">
            <TextField
              id="outlined-basic"
              label="En düşük"
              variant="outlined"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">₺ </InputAdornment>,
              }}
            />
            <TextField
              id="outlined-basic"
              label="En yüksek"
              variant="outlined"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">₺ </InputAdornment>,
              }}
            />
          </div>
        </div>
      </Menu>

      {/* Mobile Drawer */}
      <div className="break950:hidden">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <IconButton onClick={() => setMobileDrawer(true)}>
              <SortIcon />
            </IconButton>
            <Body>Filtrele ve sırala</Body>
          </div>
          <Body>199 Ürün</Body>
        </div>
        <Drawer open={mobileDrawer} onClose={() => setMobileDrawer(false)} anchor="right">
          <div className="min-w-80 p-3 text-center relative">
            <BodyS>Filtrele ve sırala</BodyS>
            <BodyS>199 Ürün</BodyS>
            <IconButton
              className="absolute top-[11px] right-2"
              onClick={() => setMobileDrawer(false)}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Divider direction="horizontal" />
          <div className="px-6 py-6 flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <Body className="font-medium">Stok Durumu :</Body>
              <Divider direction="horizontal" className="h-[0.4px]" />
              <div className="flex gap-2 items-center">
                <Checkbox className="p-0" />
                <Body>Stokta (10)</Body>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox className="p-0" />
                <Body>Stokta yok (0)</Body>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Body className="font-medium">Fiyat : En yüksek fiyat 200 TL</Body>
              <Divider direction="horizontal" className="h-[0.4px]" />
              <div className="flex gap-4 mt-3">
                <TextField
                  size="small"
                  label="En düşük"
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₺ </InputAdornment>,
                  }}
                />
                <TextField
                  size="small"
                  label="En yüksek"
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₺ </InputAdornment>,
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Body className="font-medium">Sıralama Ölçütü</Body>
              <Divider direction="horizontal" className="h-[0.4px]" />
              <Select size="small" className=" mt-1">
                <MenuItem key={'1'} value={'1'}>
                  Öne Çıkan
                </MenuItem>
                <MenuItem key={'2'} value={'2'}>
                  Fiyat, düşükten yükseğe
                </MenuItem>
                <MenuItem key={'3'} value={'2'}>
                  Fiyat, yüksekten düşüğe
                </MenuItem>
              </Select>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};
