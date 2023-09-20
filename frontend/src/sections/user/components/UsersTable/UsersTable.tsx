import { useNavigate } from "react-router-dom";

import { User } from "../../../../domain/User";
import styles from "./UsersTable.module.scss";

interface UsersTableProps {
	users: Array<User>;
	updateUser: (user: User) => void;
	enableSeeDetails: boolean;
}

export function UsersTable({ users, updateUser, enableSeeDetails }: UsersTableProps) {
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
								{enableSeeDetails && (
									<button
										className={styles.updateUserButton}
										onClick={() => seeUserDetails(user.email)}
									>
										📊
									</button>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
