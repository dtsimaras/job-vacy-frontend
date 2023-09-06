import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import ApplicationContext from '../../components/context/ApplicationContext';
import AccessDenied from '../../pages/AccessDenied';
import PropTypes from 'prop-types';

function PrivateRoute({ element, requiredRoles }) {
    const { loggedUser } = useContext(ApplicationContext);

    if (!loggedUser) return <Navigate to="/" />;

    const hasRequiredRole = loggedUser.roles.some((role) => requiredRoles.includes(role));

    if (!hasRequiredRole) return <AccessDenied />;
    
    return element;
}

PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
    requiredRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute