import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={route} />;
};

export default App;
