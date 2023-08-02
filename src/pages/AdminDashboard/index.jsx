import React, { useContext, useEffect } from 'react'
import ApplicationContext from '../../components/context/ApplicationContext';
import UserManagement from '../../components/Admin/UserManagement';
import Header from '../../components/Header';

function AdminDashboard() {
    const { loggedUser } = useContext(ApplicationContext);

    // useEffect check loggedIn and role else redirect

    return (
        <div>
            <Header />
            <UserManagement />
        </div>
    )
}

export default AdminDashboard