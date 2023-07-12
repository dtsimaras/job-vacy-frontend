import './Login.css';
import { useState, useEffect } from 'react';
import { apiLogin, createApi } from '../../api';

const Login = () =>  {

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        //api.get().then(res => console.log(res.data));
        const user = {
            email: email,
            password: password
        }
        //console.log(data);
        apiLogin.post('', user).then(res => createApi(res.data.token)).catch(err => console.log(err));
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

export default Login;