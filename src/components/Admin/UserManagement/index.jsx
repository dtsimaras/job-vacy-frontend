import useApi from "../../../hooks/useApi";
import "./style.css";
import { useState, useEffect, useContext } from "react";
import { Button, Table } from 'react-bootstrap';

//TODO: find a more appopriate name for this component
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  // const [enabled, setEnabled] = useState(false);
  const { api } = useApi();

  useEffect(() => {
    api.get("admin/users").then((res) => setUsers(res.data));
  }, []);

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
  const convertToDisplayValue = (value) => {
    return value ? 'Yes' : 'No';
  };

  return (
    <>
      <Button href="/create-user" variant="dark">New User</Button> {/*TODO: Isws na einai kai auto Tabs, i Radio, i Active Button  */}
      <Table responsive>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              {headers.map((header) => (
                <td key={header}>
                  {typeof user[header] === 'boolean'
                  ? convertToDisplayValue(user[header])
                  : user[header]}
                  </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )

  // return (
  //   <div>
  //     <h2>All the available users</h2>
  //     <button type="button" onClick={() => setEnabled(!enabled)}>
  //       {!enabled ? "See disabled" : "See enabled"}
  //     </button>

  //     <ul>
  //       {users
  //         .filter((user) => user.enabled !== enabled)
  //         .map((user) => {
  //           return (
  //             <li key={user.id}>
  //               <p>First Name : {user.firstname}</p>
  //               <p>Last Name : {user.lastname}</p>
  //               <p>Email : {user.email}</p>
  //               <p>Enabled: {user.enabled ? "true":"false"}</p>
  //               {!enabled ? (
  //                 <button onClick={() => handleDisable(user.id)}>
  //                   Disable User
  //                 </button>
  //               ) : (
  //                 <button onClick={() => handleEnable(user.id)}>
  //                   Enable User
  //                 </button>
  //               )}
  //             </li>
  //           );
  //         })}
  //     </ul>
  //     <Link to="/register">
  //       <button>Create User</button>
  //     </Link>
  //   </div>
  // );
};

export default UserManagement;
