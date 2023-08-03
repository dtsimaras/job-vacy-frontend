import useApi from "../../../hooks/useApi";
import { useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton, Pagination, Spinner, Table } from 'react-bootstrap';

//TODO: find a more appopriate name for this component
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(10);
  const { loading, get } = useApi();
  // const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get(`admin/users?pageNo=${currentPage}&pageSize=${pageSize}`);
        setUsers(res.data.content);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.pages);
        setTotalUsers(res.data.count);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  // const handleDisable = (id) => {
  //   api
  //     .delete(`admin/users/delete/${id}`)
  //     .then((res) => console.log(res.data))
  //     .finally(() =>
  //       setUsers([
  //         ...users.map((user) => {
  //           if (user.id === id) {
  //             user.enabled = false;
  //           }
  //           return user;
  //         }),
  //       ])
  //     );
  // };
  // const handleEnable = (id) => {
  //   api
  //     .post(`admin/users/enable/${id}`)
  //     .then((res) => console.log(res.data))
  //     .finally(() =>
  //       setUsers([
  //         ...users.map((user) => {
  //           if (user.id === id) {
  //             user.enabled = true;
  //           }
  //           return user;
  //         }),
  //       ])
  //     );

  // }

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
      <Button href="admin/create-user" >New User</Button> {/*TODO: Isws na einai kai auto Tabs, i Radio, i Active Button  */}
      {loading ? loader : usersTable}
    </>
  );
};

export default UserManagement;
