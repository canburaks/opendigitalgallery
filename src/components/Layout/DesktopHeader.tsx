import React, { FC, useState, useCallback } from 'react';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { BodyS, HeadlineS, LinkComponent } from '../Atoms';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCollections, useUser } from '@/data/hooks';
import { useRouter } from 'next/router';
import Badge from '@mui/material/Badge';
import { useCartStore } from '@/data/stores';
import { ETSY_LINK } from '@/constants/externalLinks';
import { SearchBox } from '../Molecules/SearchBox';
import cx from 'classnames';

interface DesktopHeaderProps {
  className?: string;
}

export const DesktopHeader: FC<DesktopHeaderProps> = ({ className }) => {
  const { asPath, push } = useRouter();
  const turkishSelectHandler = useCallback(() => {
    setLanguageAnchor(null);
    push(asPath, asPath, { locale: 'tr' });
  }, [push, asPath]);
  const englishSelectHandler = useCallback(() => {
    setLanguageAnchor(null);
    push(asPath, asPath, { locale: 'en' });
  }, [push, asPath]);

  const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(null);
  const [collectionAnchor, setCollectionAnchor] = useState<null | HTMLElement>(null);
  const [artPrintAnchor, setArtPrintAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const store = useCartStore((state) => state.store);
  const supabase = useSupabaseClient();
  const { user } = useUser();
  const { data: collectionsData } = useCollections();

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  const handleCollectionClose = () => {
    setCollectionAnchor(null);
  };

  const handleArtPrintClose = () => {
    setArtPrintAnchor(null);
  };
  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  return (
    <div className={cx('min-h-[120px] px-20 items-center p-10', className)}>
      {/* Top: Logo & Icons  */}
      <div className="flex">
        {/** Search **/}
        <SearchBox open={openSearchBox} setOpen={setOpenSearchBox} />
        {/** Logo **/}
        <div className="flex-[2] flex justify-center">
          <Link href="/" className="no-underline text-black">
            <HeadlineS className="!font-light">Open Digital Gallery</HeadlineS>
          </Link>
        </div>
        {/** Language & Cart & Login  **/}
        <div className="flex items-center gap-4 flex-1 justify-end">
          {user ? (
            <>
              <IconButton
                onClick={(e) => {
                  setProfileAnchor(e.currentTarget);
                }}
              >
                <PermIdentityOutlinedIcon className="text-black" />
              </IconButton>
              <Menu
                id="profile"
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={handleProfileClose}
              >
                <MenuItem component={Link} href="/profile">
                  My profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    supabase.auth.signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/login" className="flex items-center">
              <PermIdentityOutlinedIcon className="text-black" />
            </Link>
          )}
          <LinkComponent href="/cart" id="cartIcon">
            <Badge badgeContent={store ? store.length : 0} color="success">
              <ShoppingCartOutlinedIcon className="mt-[6px]" />
            </Badge>
          </LinkComponent>

          <Button
            id="language"
            variant="outlined"
            onClick={(e) => setLanguageAnchor(e.currentTarget)}
            className="border-1 border-black text-black py-0"
            endIcon={<KeyboardArrowDownIcon />}
          >
            Language
          </Button>
          <Menu
            id="language"
            anchorEl={languageAnchor}
            open={Boolean(languageAnchor)}
            onClose={handleLanguageClose}
          >
            <MenuItem onClick={englishSelectHandler}>English</MenuItem>
            <MenuItem onClick={turkishSelectHandler}>Turkish</MenuItem>
          </Menu>
        </div>
      </div>

      {/* Bottom: Navlink  */}
      <div className="flex justify-center gap-6 mt-6">
        <LinkComponent href="/" className="no-underline hover:underline text-black">
          <BodyS className="font-semibold">Home Page</BodyS>
        </LinkComponent>
        <Button
          id="art-prints"
          onClick={(e) => setArtPrintAnchor(e.currentTarget)}
          className=" text-black py-0 hover:bg-transparent p-0"
        >
          <BodyS className="hover:underline font-semibold">Art Prints</BodyS>
        </Button>
        <Menu
          id="art-prints"
          anchorEl={artPrintAnchor}
          open={Boolean(artPrintAnchor)}
          onClose={handleArtPrintClose}
        >
          <MenuItem onClick={handleArtPrintClose}>
            <LinkComponent href="/art-prints">All Art Prints</LinkComponent>
          </MenuItem>
          <MenuItem onClick={handleArtPrintClose}>New Arrivals</MenuItem>
          <MenuItem onClick={handleArtPrintClose}>
            <Link target="_blank" href={ETSY_LINK} className="no-underline text-black">
              Etsy Shop
            </Link>
          </MenuItem>
        </Menu>
        <Button
          id="collections"
          onClick={(e) => setCollectionAnchor(e.currentTarget)}
          className=" text-black py-0 hover:bg-transparent p-0"
        >
          <BodyS className="hover:underline font-semibold">Collections</BodyS>
        </Button>
        <Menu
          id="collections"
          anchorEl={collectionAnchor}
          open={Boolean(collectionAnchor)}
          onClose={handleCollectionClose}
        >
          {collectionsData?.data?.map((collection) => (
            <MenuItem
              key={collection.collection_id}
              component="a"
              href={`/collections/${collection.handle}`}
            >
              {collection.description}
            </MenuItem>
          ))}
          <MenuItem key="allCollections" component="a" href="/collections">
            All Collections
          </MenuItem>
        </Menu>
        <LinkComponent href="/frames" className="no-underline hover:underline text-black">
          <BodyS className="font-semibold">Frames</BodyS>
        </LinkComponent>
        <LinkComponent href="/posts" className="no-underline hover:underline text-black">
          <BodyS className="font-semibold">Blogs</BodyS>
        </LinkComponent>
      </div>
    </div>
  );
};
