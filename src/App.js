import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Products from './components/Products/Products';
import Cart from "./components/Cart/Cart";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import { useUserContext } from "./UserContext";
import { useEffect } from "react";
import Guard from "./components/Guard";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Verification from "./components/Verification/Verification";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import WishList from "./components/WishList/WishList";
import AllOrders from './components/AllOrders/AllOrders';
const routes = new createBrowserRouter([
  {
    path: 'e-commerce', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path:'/e-commerce/login', element: <Login />},
      { path: '/e-commerce/register', element: <Register /> },
      { path: '/e-commerce/home', element: <Home /> },
      { path: '/e-commerce/products', element: <Guard><Products /></Guard> },
      { path: '/e-commerce/productDetails/:id', element: <Guard><ProductDetails /></Guard> },
      { path: '/e-commerce/categories', element: <Guard><Categories /></Guard> },
      { path: '/e-commerce/brands', element: <Guard><Brands /></Guard> },
      { path: '/e-commerce/cart', element: <Guard><Cart /></Guard> },
      { path: '/e-commerce/wishList', element: <Guard><WishList /></Guard> },
      { path: 'allorders', element: <Guard><AllOrders /></Guard> },

      { path: '/e-commerce/forget-password', element: <ForgetPassword /> },
      { path: '/e-commerce/verification', element: <Verification /> },
      { path: '/e-commerce/reset-password', element: <ResetPassword /> },
      { path: '*', element: <Notfound /> },
    ]
  }
]);


function App() {
  const { user, setUser, useInfo, setUserInfo } = useUserContext();

  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setUser(localStorage.getItem("userToken"));
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    }
  }, [user]);

  return (
    <RouterProvider router={ routes} />
  );
}

export default App;
