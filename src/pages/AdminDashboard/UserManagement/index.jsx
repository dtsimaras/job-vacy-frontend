import useApi from "../../../hooks/useApi";
import { useState, useEffect } from "react";
import { Dropdown, DropdownButton, Pagination, Spinner, Table } from 'react-bootstrap';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const [totalUsers, setTotalUsers] = useState(10);
  const { loading, get } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get(`admin/users?pageNo=${currentPage}&pageSize=${pageSize}`);
        setUsers(res.data.content);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.pages);
        // setTotalUsers(res.data.count);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);


  const headers = users.length > 0 ? Object.keys(users[0]) : [];

  //TODO: maybe move this to util if we use it again
  const displayRowData = (element, header) => {
    if (typeof element[header] === 'boolean') {
      return element[header] ? 'Yes' : 'No';
    }
    if (Array.isArray(element[header])) {
      return element[header].join(", ");
    }
    return element[header];
  }

  const loader =
    <Spinner className="d-flex" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>;

  const usersTable =
    <>
      <Table responsive >
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {headers.map((header) => (
                <td key={header}>
                  {displayRowData(user, header)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        <DropdownButton variant="light" title={pageSize}>
          <Dropdown.Item onClick={() => setPageSize(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => setPageSize(20)}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => setPageSize(50)}>50</Dropdown.Item>
        </DropdownButton>
        <Pagination.First disabled={currentPage <= 1} onClick={() => setCurrentPage(1)} />
        <Pagination.Prev disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)} />
        <Pagination.Next disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
        <Pagination.Last disabled={currentPage >= totalPages} onClick={() => setCurrentPage(totalPages)} />
      </Pagination>
    </>;


  return (
    <>
      {loading ? loader : usersTable}
    </>
  );
};

export default UserManagement;
