import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useState } from 'react';

export const CustomersSearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const explain = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value); // Pass the value to the parent component
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        onChange={(e) => explain(e)}
        value={searchValue}
        fullWidth
        placeholder="Search customer"
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500 }}
      />
    </Card>
  );
};
