import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Tune as TuneIcon, List as ListIcon } from '@mui/icons-material';

const SearchBar = () => {
  return (
    <div className="flex items-center rounded-xl border border-gray-300 p-2 bg-white h-full">
      <TextField
        placeholder="Search"
        variant="standard"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="black"/>
            </InputAdornment>
          ),
        }}
        fullWidth
        className="flex-1"
      />
      <IconButton className="p-2">
        <TuneIcon />
      </IconButton>
      <IconButton className="p-2">
        <ListIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
