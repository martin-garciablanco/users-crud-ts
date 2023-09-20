import { NavBar } from "../../sections/layout/components/NavBar/NavBar";
import { UsersList } from "../../sections/user/components/UsersList/UsersList";

export function HomePage() {
	return (
		<>
			<NavBar />
			<h2>Current users</h2>
			<UsersList />
		</>
	);
}
