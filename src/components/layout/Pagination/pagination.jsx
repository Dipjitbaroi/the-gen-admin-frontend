import { Pagination } from "@mui/material";

const PaginationLayout = () => {
  return (
    <div className="flex justify-between py-2">
      <div>
        <p>Showing 1 of 32 transactions</p>
      </div>
      <div>{<Pagination count={10} shape="rounded" />}</div>
    </div>
  );
};

export default PaginationLayout;
