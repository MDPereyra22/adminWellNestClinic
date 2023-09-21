import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/LoginPages"
import SignUp from "./pages/SignUp/SignUp"
import Home from "./components/home/Home"
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./Authenticator/AuthPro";
import ProductDetail from "./components/ProductDetail/ProductDetail";


//pages
import DoctorsPages from "./pages/Doctors/DoctorsPages";
import ProductsPages from "./pages/Products/PostProducts";
import ProductsList from "./pages/ProductList/ProductList"
import UserPages from "./pages/Users/UserPages";
import UsersPages from "./pages/Users/UsersPages";

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
          element: <UsersPages></UsersPages>,
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
          element: <ProductsList></ProductsList>,
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
