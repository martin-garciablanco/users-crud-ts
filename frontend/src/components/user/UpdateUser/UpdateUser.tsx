import { SetStateAction } from "react";

import { User } from "../../../domain/User";
import { UserTemplate } from "../UserTemplate/UserTemplate";
import styles from "./UpdateUser.module.scss";

interface UpdateUserProps {
	userToUpdate: User;
	setUserToTupdate: React.Dispatch<SetStateAction<User>>;
	cancel: () => void;
	update: () => void;
}
export function UpdateUser({ userToUpdate, setUserToTupdate, cancel, update }: UpdateUserProps) {
	return (
		<div className={styles.updateBlock}>
			<p>Update User</p>
			<UserTemplate setUser={setUserToTupdate} user={userToUpdate} emailDisabled={true} />
			<div className={styles.buttonsBlock}>
				<button onClick={cancel} className={styles.button}>
					Cancel
				</button>
				<button onClick={update} className={styles.button}>
					Update
				</button>
			</div>
		</div>
	);
}
