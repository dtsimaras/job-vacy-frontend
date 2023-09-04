import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { Container, Table } from "react-bootstrap";
import EditUserModal from "./editUser/EditUserModal";
import Page from "../../pagination/Page";

const AdminUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("id");
  const { api } = useApi();

  const [editUser, setEditUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    roles: "",
    enabled: "",
  });
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    api
      .get(
        `admin/users?pageNo=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}`
      )
      .then((res) => {
        if (res.data.content !== undefined) {
          setUsers(res.data.content);
          setCurrentPage(res.data.currentPage);
          setTotalPages(res.data.pages);
        }
      })
      .catch((err) => console.error("Error Fetching Data: ", err));
  }, [currentPage, pageSize, sortBy]);

  const handleChangeSortBy = (e) => {
    setSortBy(e.target.id);
  };
  const handleEnabledClick = (id, enabled) => {
    console.log(id, enabled);
    api
      .post(`admin/users/${id}`, { enabled: enabled })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleShowEdit = (user) => {
    setEditUser({ ...user });
    setShowEdit(true);
  };
  const handleCloseWithoutSaving = () => {
    setShowEdit(false);
  };
  const handleCloseWithSaving = () => {
    api.put(`/admin/users/${editUser.id}`, editUser);
    setShowEdit(false);
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id == editUser.id) {
          return editUser;
        }
        return user;
      })
    );
  };

  return (
    <Container>
      <Table responsive>
        <thead>
          <tr style={{ cursor: "pointer" }}>
            <th
              className={sortBy === "id" ? "text-uppercase" : ""}
              id="id"
              onClick={handleChangeSortBy}
            >
              id
            </th>
            <th
              className={sortBy === "firstname" ? "text-uppercase" : ""}
              id="firstname"
              onClick={handleChangeSortBy}
            >
              First name
            </th>
            <th
              className={sortBy === "lastname" ? "text-uppercase" : ""}
              id="lastname"
              onClick={handleChangeSortBy}
            >
              Last name
            </th>
            <th
              className={sortBy === "email" ? "text-uppercase" : ""}
              id="email"
              onClick={handleChangeSortBy}
            >
              Email
            </th>
            <th
              className={sortBy === "roles" ? "text-uppercase" : ""}
              id="roles"
              onClick={handleChangeSortBy}
            >
              Roles
            </th>
            <th
              className={sortBy === "enabled" ? "text-uppercase" : ""}
              id="enabled"
              onClick={handleChangeSortBy}
            >
              Enabled
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.roles.sort().join(", ")}</td>
              <td onClick={() => handleEnabledClick(user.id, user.enabled)}>
                {user.enabled ? "enabled" : "disabled"}
              </td>
              <td>
                <EditUserModal
                  editUser={editUser}
                  setEditUser={setEditUser}
                  handleShowEdit={() => handleShowEdit(user)}
                  handleCloseWithoutSaving={handleCloseWithoutSaving}
                  handleCloseWithSaving={handleCloseWithSaving}
                  show={showEdit}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Page
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </Container>
  );
};
export default AdminUsersTable;
