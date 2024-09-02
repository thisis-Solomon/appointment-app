import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthContextProvider } from './store/authContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          // <ProtectedRoute>
          <Home />
          // </ProtectedRoute>
        ),
      },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ],
  },
]);

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
