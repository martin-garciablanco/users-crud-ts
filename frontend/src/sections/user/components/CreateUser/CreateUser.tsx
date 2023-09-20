import { SetStateAction } from "react";

import { User } from "../../../../domain/User";
import { UserTemplate } from "../UserTemplate/UserTemplate";

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
		<div>
			<p>Create User</p>
			<UserTemplate setUser={setUserToTupdate} user={userToUpdate} />
			<button onClick={onCancel}>Cancel</button>
			<button onClick={onCreate}>Create</button>
		</div>
	);
}
