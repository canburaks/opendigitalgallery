import { Body, ProductCard, SectionContainer } from '@/components';
import { useSearchPosters } from '@/data/hooks';
import { CircularProgress } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FC, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router';

export const SearchProductsView: FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [value, setValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const { data: postersData, isLoading } = useSearchPosters(
    searchTerm || search || '',
    Boolean(searchTerm || search)
  );

  const onSearch = () => {
    router.push(`/products?search=${value}`, undefined, { shallow: true });
    setSearchTerm(value);
  };

  return (
    <SectionContainer className="min-h-[calc(100vh-260px)]">
      {/* Top Bar */}

      <div className="h-20 flex justify-center items-center">
        <TextField
          placeholder="Search"
          value={value}
          className="border-black text-black w-100 "
          onChange={(e) => setValue(e.target.value)}
          InputProps={{
            endAdornment: <SearchOutlinedIcon />,
            onKeyPress: (e) => {
              if (e.key === 'Enter') {
                onSearch();
              }
            },
          }}
        />
      </div>

      {/* Results */}
      <div className="grid break1000:grid-cols-4 break650:grid-cols-3 grid-cols-2 gap-8">
        {postersData &&
          postersData.data &&
          postersData.data.map((product: any) => {
            if (!product) {
              return null;
            }
            return <ProductCard key={product.product_id} {...product} />;
          })}
      </div>

      {/* Feedback Loading */}
      {isLoading && (
        <div className="flex justify-center w-full py-20">
          <CircularProgress />
        </div>
      )}
      {/* Feedback: No Result */}
      {!isLoading && postersData && postersData.data && postersData.data.length === 0 && (
        <div className="flex justify-center w-full">
          <Body>No posters found</Body>
        </div>
      )}
    </SectionContainer>
  );
};
