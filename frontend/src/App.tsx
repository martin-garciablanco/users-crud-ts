import { UserCard } from "./sections/user/components/UserCard/UserCard";
import { useUsers } from "./sections/user/components/UserCard/useUsers";

export function App() {
	const users = useUsers();

	return (
		<div className="App">
			<h3>Dashboard of users</h3>
			<h2>Current users</h2>

			{users.map((user) => (
				<UserCard key={user.name} user={user} />
			))}
		</div>
	);
}
