import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";


const movAbleRouter = createBrowserRouter([
{ path: '/', element: <Home /> },
{ path: '/login', element: <Login /> },
{ path: '/register', element: <Register /> },
{ path: '/*', element: <NotFound /> },

]);


function App() {
  
  return (
    <>
     <RouterProvider router={movAbleRouter} />
    </>
  )
}

export default App
