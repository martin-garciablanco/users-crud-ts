import { SetStateAction } from "react";

import { User } from "../../../../domain/User";
import { UserTemplate } from "../UserTemplate/UserTemplate";
import styles from "./UpdateUser.module.scss";

interface UpdateUserProps {
	userToUpdate: User;
	setUserToTupdate: React.Dispatch<SetStateAction<User>>;
	onCancel: () => void;
	onUpdate: () => void;
}
export function UpdateUser({
	userToUpdate,
	setUserToTupdate,
	onCancel,
	onUpdate,
}: UpdateUserProps) {
	return (
		<div className={styles.updateBlock}>
			<p>Update User</p>
			<UserTemplate setUser={setUserToTupdate} user={userToUpdate} />
			<div className={styles.buttonsBlock}>
				<button onClick={onCancel} className={styles.button}>
					Cancel
				</button>
				<button onClick={onUpdate} className={styles.button}>
					Update
				</button>
			</div>
		</div>
	);
}
