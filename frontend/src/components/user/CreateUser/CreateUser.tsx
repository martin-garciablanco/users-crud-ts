import { SetStateAction } from "react";

import { User } from "../../../domain/User";
import { UserTemplate } from "../UserTemplate/UserTemplate";
import styles from "./CreateUser.module.scss";

interface CreateUserProps {
	userToUpdate: User;
	setUserToTupdate: React.Dispatch<SetStateAction<User>>;
	cancel: () => void;
	create: () => void;
}
export function CreateUser({ userToUpdate, setUserToTupdate, cancel, create }: CreateUserProps) {
	return (
		<div className={styles.createBlock}>
			<p>Create User</p>
			<UserTemplate setUser={setUserToTupdate} user={userToUpdate} emailDisabled={false} />
			<div className={styles.buttonsBlock}>
				<button onClick={cancel} className={styles.button}>
					Cancel
				</button>
				<button onClick={create} className={styles.button}>
					Create
				</button>
			</div>
		</div>
	);
}
