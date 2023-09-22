import { ChangeEvent, SetStateAction } from "react";

import { User } from "../../../domain/User";
import styles from "./UserTemplate.module.scss";

interface UserTemplateProps {
	user: User;
	setUser: React.Dispatch<SetStateAction<User>>;
	emailDisabled?: boolean;
	cancel: () => void;
	accept: () => void;
}

export function UserTemplate({
	user,
	setUser,
	cancel,
	accept,
	emailDisabled = false,
}: UserTemplateProps) {
	const userChange = (
		e: ChangeEvent<HTMLInputElement>,
		field: keyof Pick<User, "name" | "lastName" | "phoneNumber" | "email">
	) => {
		const updatedUser: User = { ...user };
		updatedUser[field] = e.target.value;
		setUser(updatedUser);
	};

	return (
		<div data-testid="user-template" className={styles.userTemplate}>
			<div className={styles.block}>
				<span>Email</span>
				<input
					className={styles.input}
					type="text"
					value={user.email || ""}
					disabled={emailDisabled ? true : false}
					onChange={(e) => userChange(e, "email")}
				/>
			</div>
			<div className={styles.block}>
				<span>Name</span>
				<input
					name="name"
					className={styles.input}
					type="text"
					value={user.name || ""}
					onChange={(e) => userChange(e, "name")}
				/>
			</div>
			<div className={styles.block}>
				<span>Last name</span>
				<input
					name="lastName"
					className={styles.input}
					type="text"
					value={user.lastName || ""}
					onChange={(e) => userChange(e, "lastName")}
				/>
			</div>
			<div className={styles.block}>
				<span>Phone number</span>
				<input
					name="phoneNumber"
					className={styles.input}
					type="text"
					value={user.phoneNumber || ""}
					onChange={(e) => userChange(e, "phoneNumber")}
				/>
			</div>
			<div className={styles.buttonsBlock}>
				<button onClick={cancel} className={styles.button}>
					Cancel
				</button>
				<button onClick={accept} className={styles.button}>
					Accept
				</button>
			</div>
		</div>
	);
}
