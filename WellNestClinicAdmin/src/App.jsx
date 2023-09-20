import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/LoginPages"
import SignUp from "./pages/SignUp/SignUp"
import Home from "./components/home/Home"
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./Authenticator/AuthPro";
import PostUser from "./components/PostUser/PostUser";
import Users from "./components/Users/Users";
import PostProducts from "./components/PostProducts/PostProducts";
import GetProducts from "./components/GetProducts/GetProducts";
import ProductDetail from "./components/ProductDetail/ProductDetail";


//pages
import DoctorsPages from "./pages/Doctors/DoctorsPages";

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
          element: <DoctorsPages></DoctorsPages>,
        },
        {
          path: "/postProducts",
          element: <PostProducts></PostProducts>,
        },
        {
          path: "/getProducts",
          element: <GetProducts></GetProducts>,
        },
        {
          path: "/product/:id",
          element: <ProductDetail></ProductDetail>,
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
