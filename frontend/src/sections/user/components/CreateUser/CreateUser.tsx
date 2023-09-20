import { SetStateAction } from "react";

import { User } from "../../../../domain/User";
import { UserTemplate } from "../UserTemplate/UserTemplate";
import styles from "./CreateUser.module.scss";

interface CreateUserProps {
	userToUpdate: User;
	setUserToTupdate: React.Dispatch<SetStateAction<User>>;
	onCancel: () => void;
	onCreate: () => void;
}
export function CreateUser({
	userToUpdate,
	setUserToTupdate,
	onCancel,
	onCreate,
}: CreateUserProps) {
	return (
		<div className={styles.createBlock}>
			<p>Create User</p>
			<UserTemplate setUser={setUserToTupdate} user={userToUpdate} />
			<div className={styles.buttonsBlock}>
				<button onClick={onCancel} className={styles.button}>
					Cancel
				</button>
				<button onClick={onCreate} className={styles.button}>
					Create
				</button>
			</div>
		</div>
	);
}
