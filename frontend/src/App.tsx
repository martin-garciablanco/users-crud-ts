import { createBrowserRouter, RouterProvider } from "react-router-dom";

import styles from "./App.module.scss";
import { HomePage } from "./pages/HomePage/HomePage";
import { UserDetails } from "./pages/UserDetails/UserDetails";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "users",
		element: <UserDetails />,
	},
	{
		path: "/*",
		element: <HomePage />,
	},
]);

export function App() {
	return (
		<div className={styles.app}>
			<RouterProvider router={router} />
		</div>
	);
}
