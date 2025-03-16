import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import filter from "../../../assets/filter.png";
import addCol from "../../../assets/add-col.png";

const FilterAndAddColSearchBar = ({ onSearchChange }) => {
  return (
    <div className="flex items-center rounded-xl border border-gray-300 px-2 bg-white h-full">
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
        onChange={onSearchChange} // Add onChange event handler
      />
      <div className="flex">
        <div className="border-l"></div>
        <button className="px-2 h-full hover:bg-gray-100 ">
          <img className="h-6 w-6" src={filter} alt="Filter" />
        </button>
        <div className="border-l"></div>
        <button className="px-2 h-full hover:bg-gray-100 ">
          <img className="h-6 w-6" src={addCol} alt="Add Column" />
        </button>
      </div>
    </div>
  );
};

export default FilterAndAddColSearchBar;
