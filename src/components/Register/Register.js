import './Register.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7195/users')
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [users]);

    const handleSubmit = async (e) => {
        let flag = false;
        e.preventDefault();
        if ( users.length === 0) {
            const data = {
                Username: username,
                Password: password,
                Email: email
            };

            axios.post('https://localhost:4000/users', data).then(res => {
                console.log(res.data);
            });
            alert("User has been created successfully!");
            setUsername('');
            setEmail('');
            setPassword('');
            return;
        } else {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username) {
                    flag = true;
                    break;
                }
            }
        }

        if (flag === false) {
            const data = {
                Username: username,
                Password: password,
                Email: email
            };

            await axios.post('https://localhost:4000/users', data).then(res => {
                console.log(res.data);
            });
            console.log(users)
            alert("User has been created successfully!");
            setUsername('');
            setEmail('');
            setPassword('');
        } else {
            alert("User already exists");
            setUsername('');
            setEmail('');
            setPassword('');
        }
    }

    return (
        <div>
        <h2>Create a new user</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input value={username} name="username" onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Username" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="example@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Create User</button>
        </form>
        </div>
    )
}

export default Register;