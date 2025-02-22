import { Checkbox, FormControlLabel } from "@mui/material";
import { purple } from "@mui/material/colors";

const CustomCheckbox = ({ label, checked, onChange }) => {

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
        //   className={classes.checkbox}
          inputProps={{ "aria-label": "primary checkbox" }}
          sx={{
            "&.Mui-checked": {
              color: purple[500],
            },
          }}
        />
      }
      label={label}
      className="text-black font-sans"
    />
  );
};

export default CustomCheckbox;
