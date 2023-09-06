import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'

const AccessDenied = () => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // After 5 seconds, set the redirect state to true
        const timer = setTimeout(() => {
            setRedirect(true);
        }, 5000);

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    if (redirect) {
        // Redirect to a different page after 5 seconds
        return <Navigate to="/" />;
    }

    return (
        <>
            <div>
                <h1>Access Denied</h1>
                <p>You do not have permission to access this page.</p>
                <p>Redirecting to the home page in 5 seconds...</p>
            </div>
        </>
    );
};

export default AccessDenied;