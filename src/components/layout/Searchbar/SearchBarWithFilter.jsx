import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import filter from "../../../assets/filter.png";

const FilterSearchBar = ({ onSearchChange }) => {
  return (
    <div className="flex items-center rounded-xl border border-gray-300 p-2 bg-white h-full">
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
        onChange={onSearchChange}
        className="flex-1"
      />
      <div className="flex">
        <div className="border-l"></div>
        <button className="px-2 h-full hover:bg-gray-100 ">
          <img className="h-6 w-6" src={filter} alt="Filter" />
        </button>
      </div>
    </div>
  );
};

export default FilterSearchBar;
