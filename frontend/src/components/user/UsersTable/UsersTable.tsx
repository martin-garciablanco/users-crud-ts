import { User } from "../../../domain/User";
import styles from "./UsersTable.module.scss";

interface UsersTableProps {
	users: Array<User>;
	update: (user: User) => void;
	remove: (user: User) => void;
	seeDetails?: (user: User) => void;
	enableSeeDetails: boolean;
}

export function UsersTable({
	users,
	update: updateUser,
	enableSeeDetails,
	remove: removeUser,
	seeDetails,
}: UsersTableProps) {
	const onSeeDetails = (user: User) => {
		if (seeDetails) {
			seeDetails(user);
		}
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
				{users.map((user, index) => {
					return (
						<tr key={index}>
							<td>{user.email}</td>
							<td>{user.name}</td>
							<td>{user.lastName}</td>
							<td>{user.phoneNumber}</td>
							<td>
								<button className={styles.updateUserButton} onClick={() => updateUser(user)}>
									✏️
								</button>
								<button className={styles.updateUserButton} onClick={() => removeUser(user)}>
									❌
								</button>
								{enableSeeDetails && (
									<button className={styles.updateUserButton} onClick={() => onSeeDetails(user)}>
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
