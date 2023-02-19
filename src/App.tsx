import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { loader as weatherLoader } from "./components/Dashboard/Weather";

const router = createBrowserRouter([
	{ path: "", element: <Login /> },
	{ path: "register", element: <Register /> },
	{ path: "dashboard", element: <Dashboard />, loader: weatherLoader },
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
