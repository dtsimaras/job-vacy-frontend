/* eslint-disable react/prop-types */
import { Dropdown, DropdownButton, Pagination } from "react-bootstrap";


const Page = ({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <Pagination className="justify-content-center">
      <DropdownButton variant="light" title={pageSize}>
        <Dropdown.Item onClick={() => setPageSize(10)}>10</Dropdown.Item>
        <Dropdown.Item onClick={() => setPageSize(20)}>20</Dropdown.Item>
        <Dropdown.Item onClick={() => setPageSize(50)}>50</Dropdown.Item>
      </DropdownButton>

      <Pagination.First
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(1)}
      />
      <Pagination.Prev
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      />
      <Pagination.Next
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      />
      <Pagination.Last
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(totalPages)}
      />
    </Pagination>
  );
};
export default Page;
