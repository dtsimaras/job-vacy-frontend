import React, { useContext } from 'react'
import ApplicationContext from '../../components/context/ApplicationContext'
import Login from '../../components/Login';
import Header from '../../components/Header';

function Home() {
    const { loggedUser } = useContext(ApplicationContext);

    const loggedIn = (
        <>
            <Header />
            <center><h2>Hello, {loggedUser.firstname} </h2></center>
        </>
    );

    const notloggedIn = (<Login />);

    return (
        <div>
            {loggedUser ? loggedIn : notloggedIn}
        </div>
    )
}

export default Home