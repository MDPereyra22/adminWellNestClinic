import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/LoginPages"
import SignUp from "./pages/SignUp/SignUp"
import Home from "./components/home/Home"
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./Authenticator/AuthPro";
import Users from "./components/Users/Users";
import GetProducts from "./components/GetProducts/GetProducts";
import ProductDetail from "./components/ProductDetail/ProductDetail";


//pages
import DoctorsPages from "./pages/Doctors/DoctorsPages";
import ProductsPages from "./pages/Products/PostProducts";
import UserPages from "./pages/Users/UserPages";

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
          element: <UserPages></UserPages>,
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
          element: <ProductsPages></ProductsPages>,
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
