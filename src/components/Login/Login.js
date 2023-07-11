import './Login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const Login = () =>  {

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const api = axios.create({baseURL:'http://localhost:4000/api/v1/auth'})

    const handleSubmit = (e) => {
        e.preventDefault();
        //api.get().then(res => console.log(res.data));
        const data = {
            email: email,
            password: password
        }
        //console.log(data);
        api.post('/login', data).then(res => console.log(res.data)).catch(err => console.log(err));
    }

    return (
        <div>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" placeholder="email@exmaple.com"
                    id="email"
                    name="email"
                    required
                />
                <label htmlFor="password">Password</label>
                <input value={password}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                    required
                />
                <button className="link-btn" type="submit">Log In</button>
            </form>
        </div>
    )
}