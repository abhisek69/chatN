import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/home';
import ErrorPage from './pages/error';
import Login from "./pages/login";
import CreateID from "./pages/createID";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/createID",
    element: <CreateID />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: '*',
    Component: ErrorPage,
  },
])
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
