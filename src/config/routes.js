import Sessions from "../pages/Sessions.jsx";
import {Navigate} from "react-router-dom";

const adminRoutes = [

    {path:"/", index: true, element: <Navigate replace to={"/sessions"} /> },
    {path: "/sessions", element: <Sessions />  },
]

export default  adminRoutes
