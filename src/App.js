import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthSuccess from "./pages/AuthSuccess";
import ContactList from "./pages/ContactList";

const router = createBrowserRouter([
  { path: '/', element: <HomePage/> },
  { path: '/token', element: <AuthSuccess/>},
  { path: '/contacts', element: <ContactList/>},
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;