import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/LoginPages"
import SignUp from "./pages/SignUp/SignUp"
import Home from "./components/home/Home"
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./Authenticator/AuthPro";
import PostUser from "./components/PostUser/PostUser";
import Users from "./components/Users/Users";
import PostDoctor from "./components/PostDoctor/PostDoctor";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>
    },
    {
      path: "/sign-up",
      element: <SignUp></SignUp>
    },
    {
      path: "/",
      element: <ProtectedRoute></ProtectedRoute>,
      children: [
        {
          path: "/home",
          element: <Home></Home>,
        },
        {
          path: "/postUser",
          element: <PostUser></PostUser>,
        },
        {
          path: "/users",
          element: <Users></Users>,
        },
        {
          path: "/postDoctor",
          element: <PostDoctor></PostDoctor>,
        }
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
