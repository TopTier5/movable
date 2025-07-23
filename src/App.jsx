import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import UserPage from "./pages/UserPage";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";




const movAbleRouter = createBrowserRouter([
{ path: '/', element: <Home /> },
{ path: '/login', element: <Login /> },
{ path: '/register', element: <Register /> },
{ path: '/*', element: <NotFound /> },
{ path: '/userpage', element: <UserPage /> },
{ path: '/settings', element: <Settings /> },
{ path: '/editprofile', element: <EditProfile />},


]);


function App() {
  
  return (
    <>
     <RouterProvider router={movAbleRouter} />
    </>
  )
}

export default App
