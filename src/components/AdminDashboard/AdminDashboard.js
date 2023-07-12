import './AdminDashboard.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ token, api }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('/admin/users').then(res => setUsers(res.data))
    }, [])

    const handleDelete = async (id) => {
        await fetch(`https://localhost:4000/users/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        await fetch('https://localhost:4000/users')
        .then(res => res.json())
        .then(data => setUsers(data))
    }

    return (
        <div>
            <h2>All the available users : {users.length}</h2>
                <ul>
                    {users.map((user) => {
                        return (
                            <li key={user.id}>
                            <p>First Name : {user.firstname}</p>
                            <p>Last Name : {user.lastname}</p>
                            <p>Email : {user.email}</p>
                            <button onClick={() => handleDelete(user.id)}>Delete User</button>         
                        </li>
                        )
                    })}
                </ul>
            <Link to='/register'>
                <button>Create User</button>
            </Link>
            
        </div>
    )
}

export default AdminDashboard;