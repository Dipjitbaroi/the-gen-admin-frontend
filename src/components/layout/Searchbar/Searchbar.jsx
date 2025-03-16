import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import filter from "../../../assets/filter.png";
import addCol from "../../../assets/add-col.png";

const SearchBar = () => {
  return (
    <div className="flex items-center rounded-xl border border-gray-300 p-2 bg-white h-14">
      <TextField
        placeholder="Search"
        variant="standard"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="black" />
            </InputAdornment>
          ),
        }}
        fullWidth
        className="flex-1"
      />
    </div>
  );
};

export default SearchBar;
