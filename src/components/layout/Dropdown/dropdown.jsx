import { MenuItem, Select } from "@mui/material";

const DropdownComponent = ({ value, handleChange }) => {
  return (
    <div className="flex items-center">
      <Select
        className="h-2/4 w-fit"
        value={value}
        onChange={handleChange}
        disableUnderline
        sx={{
          borderRadius: "20px", // Reduced border radius
          padding: "0.5rem", // TailwindCSS class for p-2
          display: "flex",
          alignItems: "center",
          "& .MuiSelect-icon": {
            color: "#8734A3", // TailwindCSS class for text-purple-500
          },
        }}
      >
        <MenuItem value="thisMonth">This Month</MenuItem>
        <MenuItem value="January">January</MenuItem>
        <MenuItem value="February">February</MenuItem>
        <MenuItem value="March">March</MenuItem>
        <MenuItem value="April">April</MenuItem>
        <MenuItem value="May">May</MenuItem>
        <MenuItem value="June">June</MenuItem>
        <MenuItem value="July">July</MenuItem>
        <MenuItem value="August">August</MenuItem>
        <MenuItem value="September">September</MenuItem>
        <MenuItem value="October">October</MenuItem>
        <MenuItem value="November">November</MenuItem>
        <MenuItem value="December">December</MenuItem>
        {/* Add more MenuItem components as needed */}
      </Select>
    </div>
  );
};

export default DropdownComponent;
