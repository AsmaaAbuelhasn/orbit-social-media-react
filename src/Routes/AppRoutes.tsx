import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../LayOuts/MainLayOut/MainLayOut";
import Profile from "../pages/profile/Profile";
import Feeds from "../pages/Feeds/Feeds";
import Notfound from "../pages/NotFound/Notfound";
import AuthLayOut from "../LayOuts/AuthLayOut/AuthLayOut";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import ProtectedRoutes from "../Components/ProtectedRoutes/ProtectedRoutes";
import Notifications from './../pages/Notifications/Notifications';
import Setting from './../pages/Setting/Setting';
import PostDetailes from '../pages/PostDetails/PostDetailes';



export const routes=createBrowserRouter([
    {
        path:'',
        element:<MainLayOut/>,
        children:[
            
            {index:true,element:<ProtectedRoutes> <Feeds/> </ProtectedRoutes> },
            {path:'profile', element:<ProtectedRoutes> <Profile/></ProtectedRoutes>  },
            {path:'notification', element:<ProtectedRoutes> <Notifications/></ProtectedRoutes>  },
            {path:"*",element:<Notfound/>},
            {path:"posts/:id",element:<PostDetailes/>},
            {path:"settings",element:<ProtectedRoutes> <Setting/></ProtectedRoutes> }
            
    ]
    },
    {
        path:'auth',
        element:<AuthLayOut/>,
        children:
        [
            {index:true,element:<Login/>},
            {path:"login",element:<Login/>},
            {path:"signup",element:<Register/>},
            {path:"*",element:<Notfound/>}
        ]
    }
])