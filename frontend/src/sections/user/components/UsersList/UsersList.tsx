import { User } from "../../../../domain/User";
import { UserCard } from "../UserCard/UserCard";

const users: Array<User> = [
	{ email: "javi@mail.com", name: "Javi", lastName: "Lopez", phoneNumber: "666555444" },
	{ email: "anna@mail.com", name: "Anna", lastName: "Pisuerga", phoneNumber: "888999777" },
];

export function UsersList() {
	return (
		<>
			{users.map((user) => (
				<UserCard key={user.email} user={user} />
			))}
		</>
	);
}
