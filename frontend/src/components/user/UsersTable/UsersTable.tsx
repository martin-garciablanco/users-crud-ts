import { User } from "../../../domain/User";
import styles from "./UsersTable.module.scss";

interface UsersTableProps {
	users: Array<User>;
	update: (user: User) => void;
	remove: (user: User) => void;
	seeDetails?: (user: User) => void;
}

export function UsersTable({
	users,
	update: updateUser,
	remove: removeUser,
	seeDetails,
}: UsersTableProps) {
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
				{users.map((user, index) => {
					return (
						<tr key={index}>
							<td>{user.email}</td>
							<td>{user.name}</td>
							<td>{user.lastName}</td>
							<td>{user.phoneNumber}</td>
							<td className={styles.buttonsBlock}>
								<button className={styles.updateUserButton} onClick={() => updateUser(user)}>
									✏️
								</button>
								<button className={styles.updateUserButton} onClick={() => removeUser(user)}>
									❌
								</button>
								{seeDetails && (
									<button className={styles.updateUserButton} onClick={() => seeDetails(user)}>
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
