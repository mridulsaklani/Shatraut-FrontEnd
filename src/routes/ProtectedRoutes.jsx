import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Preloader from "../components/common/Preloader";
import api from "../components/common/api";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/auth/verify-auth`, { withCredentials: true })
            .then((res) => {
                setIsAuthenticated(res.data.isAuthenticated);
                setUser(res.data?.user);
            })
            .catch(() => setIsAuthenticated(false))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Preloader/>;

    if (!isAuthenticated) return <Navigate to="/login" />;

    

    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/" />;
    }

    

    return children; 
};

export default ProtectedRoute;


