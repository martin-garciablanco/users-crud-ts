import { useNavigate } from "react-router-dom";

import { User } from "../../../../domain/User";
import styles from "./UsersTable.module.scss";

const users: Array<User> = [
	{ email: "javi@mail.com", name: "Javi", lastName: "Lopez", phoneNumber: "666555444" },
	{ email: "anna@mail.com", name: "Anna", lastName: "Pisuerga", phoneNumber: "888999777" },
];

interface UsersTableProps {
	updateUser: (user: User) => void;
}

export function UsersTable({ updateUser }: UsersTableProps) {
	const navigate = useNavigate();

	const seeUserDetails = (email: string) => {
		navigate(`/users?email=${email}`);
	};

	return (
		<table>
			<thead>
				<tr>
					<th>Email</th>
					<th>Name</th>
					<th>Last name</th>
					<th>Phone number</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => {
					return (
						<tr key={user.email}>
							<td>{user.email}</td>
							<td>{user.name}</td>
							<td>{user.lastName}</td>
							<td>{user.phoneNumber}</td>
							<td>
								<button className={styles.updateUserButton} onClick={() => updateUser(user)}>
									✏️
								</button>
								<button
									className={styles.updateUserButton}
									onClick={() => seeUserDetails(user.email)}
								>
									📊
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
