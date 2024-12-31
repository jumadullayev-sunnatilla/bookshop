import { useRoutes } from "react-router-dom";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Layout from "../pages/layout/Layout";
import Shop from "../pages/shop/Shop";
import Manage from "../pages/manage/Manage";
const Routers = () => {
  return (
    <>
      {useRoutes([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/about",
              element: <About />,
            },
            {
              path: "/manage",
              element: <Manage />,
            },
            {
              path: "/shop",
              element: <Shop />,
            },

            {
              path: "*",
              element: <div>404</div>,
            },
            {
              path: "/product/:id",
              element: <div>detail</div>,
            },
          ],
        },
      ])}
    </>
  );
};

export default Routers;
