import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import PropTypes from "prop-types";
import SessionUtils from "../utils/SessonUtils";
import AuthService from "../services/AuthService";

const AppProvider = ({ children }) => {
    const [token, setToken] = useState(SessionUtils.get("api-token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token && !user) {
            AuthService.getUser()
                .then((response) => {
                    setUser(response.data.user);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token, user]);

    return (
        <AppContext.Provider
            value={{
                data: { token, user },
                action: { setToken, setUser },
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.any,
};

export default AppProvider;
