import { Children, createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//Initial User Status
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    // user: {
    //     _id: "62e4e9d42f2cedd67e20065a",
    //     username: "hddquang",
    //     email: "hddquang19@gmail.com",
    //     password: "KuroNeko19",
    //     profilePicture: "/person/1.jpeg",
    //     coverPicture: "",
    //     followers: [],
    //     followings: [],
    //     isAdmin: false,
    // },
    isFetching: false,
    error: false,
};

//Global Status Management
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

