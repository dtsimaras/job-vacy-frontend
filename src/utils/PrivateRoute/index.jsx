/* eslint-disable react/prop-types */
import  { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ApplicationContext from '../../components/context/ApplicationContext';

function PrivateRoute({ element, requiredRoles }) {
    const { loggedUser } = useContext(ApplicationContext);

    if (!loggedUser) return <Navigate to="/" />;

    // eslint-disable-next-line react/prop-types
    const hasRequiredRole = loggedUser.roles.some((role) => requiredRoles.includes(role));

    if (!hasRequiredRole) return <Navigate to="/?role=false"/>; //TODO: maybe create an unauthorized page
    
    return element;
}

export default PrivateRoute