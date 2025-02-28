import { Pagination } from '@mui/material';

const PaginationLayout = ({ totalPages, page, totalItems, itemsPerPage, onChangePage }) => {
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const handlePageChange = (event, value) => {
    onChangePage(event, value);
  };

  return (
    <div className="flex justify-between py-2">
      <div>
        <p>Showing {startItem}-{endItem} of {totalItems} transactions</p>
      </div>
      <div>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default PaginationLayout;
