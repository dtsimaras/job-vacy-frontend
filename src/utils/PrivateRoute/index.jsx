import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import ApplicationContext from '../../components/context/ApplicationContext';

function PrivateRoute({ element, requiredRoles }) {
    const { loggedUser } = useContext(ApplicationContext);

    if (!loggedUser) return <Navigate to="/" />;

    const hasRequiredRole = loggedUser.roles.some((role) => requiredRoles.includes(role));

    if (!hasRequiredRole) return <Navigate to="/" />; //TODO: maybe create an unauthorized page
    
    return element;
}

export default PrivateRoute