import { User } from "../../../../domain/User";

const users: Array<User> = [
	{ email: "javi@mail.com", name: "Javi", lastName: "Lopez", phoneNumber: "666555444" },
	{ email: "anna@mail.com", name: "Anna", lastName: "Pisuerga", phoneNumber: "888999777" },
];

export function UsersTable() {
	return (
		<table>
			<tr>
				<th>Email</th>
				<th>Name</th>
				<th>Last name</th>
				<th>Phone number</th>
			</tr>
			{users.map((user) => {
				return (
					<tr>
						<td>{user.email}</td>
						<td>{user.name}</td>
						<td>{user.lastName}</td>
						<td>{user.phoneNumber}</td>
					</tr>
				);
			})}
		</table>
	);
}
