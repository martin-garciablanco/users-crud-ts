import { ChangeEvent, SetStateAction } from "react";

import { User } from "../../../domain/User";
import styles from "./UserTemplate.module.scss";

interface UserTemplateProps {
	user: User;
	setUser: React.Dispatch<SetStateAction<User>>;
}

export function UserTemplate({ user, setUser }: UserTemplateProps) {
	const onUserChange = (e: ChangeEvent<HTMLInputElement>, field: keyof User) => {
		const updatedUser: User = { ...user };
		updatedUser[field] = e.target.value;
		setUser(updatedUser);
	};

	return (
		<>
			<div className={styles.block}>
				<span>Email</span>
				<input
					className={styles.input}
					type="text"
					value={user.email}
					onChange={(e) => onUserChange(e, "email")}
				/>
			</div>
			<div className={styles.block}>
				<span>Name</span>
				<input
					className={styles.input}
					type="text"
					value={user.name}
					onChange={(e) => onUserChange(e, "name")}
				/>
			</div>
			<div className={styles.block}>
				<span>Last name</span>
				<input
					className={styles.input}
					type="text"
					value={user.lastName}
					onChange={(e) => onUserChange(e, "lastName")}
				/>
			</div>
			<div className={styles.block}>
				<span>Phone number</span>
				<input
					className={styles.input}
					type="text"
					value={user.phoneNumber}
					onChange={(e) => onUserChange(e, "phoneNumber")}
				/>
			</div>
		</>
	);
}
