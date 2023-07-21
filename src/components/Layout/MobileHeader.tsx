import {
  Badge,
  Button,
  Collapse,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { FC, useCallback, useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { BodyL, BodyX, HeadlineS, LinkComponent } from '../Atoms';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useCartStore } from '@/data/stores';
import { useCollections, useUser } from '@/data/hooks';
import Link from 'next/link';
import { ETSY_LINK, socialMedia } from '@/constants/externalLinks';
import cx from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader: FC<MobileHeaderProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(null);
  const [collapseCollection, setCollapseCollection] = useState(false);
  const [collapseArtPrints, setCollapseArtPrints] = useState(false);
  const store = useCartStore((state) => state.store);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const { data: collectionsData } = useCollections();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useUser();
  const supabase = useSupabaseClient();

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  const { asPath, push } = useRouter();
  const turkishSelectHandler = useCallback(() => {
    setLanguageAnchor(null);
    push(asPath, asPath, { locale: 'tr' });
  }, [push, asPath]);
  const englishSelectHandler = useCallback(() => {
    setLanguageAnchor(null);
    push(asPath, asPath, { locale: 'en' });
  }, [push, asPath]);

  const onAuth = async () => {
    if (user) {
      await supabase.auth.signOut();
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    const routeChangeHandler = () => {
      setOpen(false);
    };
    router.events.on('routeChangeComplete', routeChangeHandler);

    return () => {
      router.events.off('routeChangeComplete', routeChangeHandler);
    };
  }, [router.events]);

  return (
    <div className={cx('flex justify-between items-center p-5 break450:p-8', className)}>
      {/* Hamburger Menu */}
      <div>
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon className="text-black w-6" />
        </IconButton>
      </div>
      {/* Logo  */}
      <div>
        <LinkComponent href="/" className="no-underline text-black ">
          <HeadlineS className="!font-light text-xl break450:text-2xl  ">
            Open Digital Gallery
          </HeadlineS>
        </LinkComponent>
      </div>
      {/* Search and Cart   */}
      <div>
        {/** Language & Cart & Login  **/}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="flex items-center flex-1">
            <IconButton
              onClick={() => {
                setOpenSearchBox(true);
              }}
            >
              <SearchOutlinedIcon className="text-black w-6" />
            </IconButton>
            <Drawer anchor="top" open={openSearchBox} onClose={() => setOpenSearchBox(false)}>
              <div className="h-30 flex justify-center items-center">
                <TextField
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-black text-black w-full pl-5"
                  InputProps={{
                    endAdornment: <SearchOutlinedIcon />,
                    onKeyPress: (e) => {
                      if (e.key === 'Enter') {
                        console.log('trigger search');
                        setOpenSearchBox(false);
                        router.push('/products?search=' + searchTerm);
                      }
                    },
                  }}
                />
                <IconButton onClick={() => setOpenSearchBox(false)} className="ml-2">
                  <CloseIcon className="w-6" />
                </IconButton>
              </div>
            </Drawer>
          </div>
          <LinkComponent href="/cart" id="cartIcon">
            <Badge badgeContent={store && store.length} color="success">
              <ShoppingCartOutlinedIcon className="w-6" />
            </Badge>
          </LinkComponent>
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="min-w-82">
          {/* Content */}
          <div>
            <IconButton onClick={() => setOpen(false)} className="flex w-full justify-end p-5">
              <CloseIcon />
            </IconButton>
            <div className="flex flex-col mx-10 my-8 gap-4 ">
              <LinkComponent href="/">
                <BodyX>Home</BodyX>
              </LinkComponent>
              <div>
                <Button
                  onClick={() => setCollapseCollection((prev) => !prev)}
                  className="flex  justify-between w-full pl-0 py-0"
                >
                  <BodyX>Collections</BodyX>
                  {collapseCollection ? <ExpandLess /> : <ExpandMore />}
                </Button>
                <Collapse in={collapseCollection} timeout="auto" unmountOnExit>
                  <div className="pl-6 gap-1 flex flex-col mt-1">
                    {collectionsData?.data?.map((collection) => (
                      <LinkComponent
                        key={collection.collection_id}
                        href={`/collections/${collection.handle}`}
                      >
                        <BodyL> {collection.description}</BodyL>
                      </LinkComponent>
                    ))}
                    <LinkComponent href="/collections">
                      <BodyL>All Collections</BodyL>
                    </LinkComponent>
                  </div>
                </Collapse>
              </div>
              <div>
                <Button
                  onClick={() => setCollapseArtPrints((prev) => !prev)}
                  className="flex  justify-between w-full pl-0 py-0"
                >
                  <BodyX>Art Prints</BodyX>
                  {collapseArtPrints ? <ExpandLess /> : <ExpandMore />}
                </Button>
                <Collapse in={collapseArtPrints} timeout="auto" unmountOnExit>
                  <div className="pl-6 gap-1 flex flex-col mt-1">
                    <LinkComponent href="/art-prints">
                      <BodyL> All Art Prints</BodyL>
                    </LinkComponent>
                    <LinkComponent href="/">
                      <BodyL> New Arrivals</BodyL>
                    </LinkComponent>
                    <Link href={ETSY_LINK} className="text-black" target="_blank">
                      <BodyL> Etsy Shop</BodyL>
                    </Link>
                  </div>
                </Collapse>
              </div>
              <LinkComponent href="/frames">
                <BodyX>Frames</BodyX>
              </LinkComponent>
              <LinkComponent href="/posts">
                <BodyX>Blogs</BodyX>
              </LinkComponent>
              {user && (
                <LinkComponent href="/profile">
                  <BodyX>Profile</BodyX>
                </LinkComponent>
              )}
            </div>
          </div>

          <Button
            className="absolute bottom-[170px] w-60 left-[40px]"
            id="language"
            color="inherit"
            variant="outlined"
            onClick={onAuth}
          >
            <BodyX>{user ? 'Sign Out' : 'Login'}</BodyX>
          </Button>

          {/* Drawer Footer */}
          <div className="absolute bottom-0 bg-gray-200 p-10">
            <Button
              id="language"
              variant="outlined"
              onClick={(e) => setLanguageAnchor(e.currentTarget)}
              className="border-1 border-black border-solid bg-white right-5 px-4 py-1 text-black absolute bottom-[95px]"
              endIcon={<KeyboardArrowDownIcon />}
            >
              Language
            </Button>
            <div className="flex gap-8  justify-center w-full  ">
              <Link href={socialMedia.twitter} target="_blank" className="text-black">
                <TwitterIcon className=" hover:scale-110" />
              </Link>
              <Link href={socialMedia.facebook} target="_blank" className="text-black">
                <FacebookIcon className=" hover:scale-110" />
              </Link>
              <Link href={socialMedia.pinterest} target="_blank" className="text-black">
                <PinterestIcon className=" hover:scale-110" />
              </Link>
              <Link href={socialMedia.instagram} target="_blank" className="text-black">
                <InstagramIcon className=" hover:scale-110" />
              </Link>
              <Link href={socialMedia.telegram} target="_blank" className="text-black">
                <TelegramIcon className=" hover:scale-110" />
              </Link>
            </div>
          </div>
        </div>
        <Menu
          id="language"
          anchorEl={languageAnchor}
          open={Boolean(languageAnchor)}
          onClose={handleLanguageClose}
        >
          <MenuItem onClick={englishSelectHandler}>English</MenuItem>
          <MenuItem onClick={turkishSelectHandler}>Turkish</MenuItem>
        </Menu>
      </Drawer>
    </div>
  );
};
