import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login"
import Home from "./components/home/Home"
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./Authenticator/AuthPro";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>
    },
    {
      path: "/",
      element: <ProtectedRoute></ProtectedRoute>,
      children: [
        {
          path: "/home",
          element: <Home></Home>,
        },
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
