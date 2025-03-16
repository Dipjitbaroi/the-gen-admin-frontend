import { CircularProgress } from "@mui/material";

const Loader = ({ color }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress sx={{ color: color || "#8734A3" }} />
    </div>
  );
};

export default Loader;
