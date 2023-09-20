import { SetStateAction } from "react";

import { User } from "../../../../domain/User";
import { UserTemplate } from "../UserTemplate/UserTemplate";

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
		<div>
			<p>Update User</p>
			<UserTemplate setUser={setUserToTupdate} user={userToUpdate} />
			<button onClick={onCancel}>Cancel</button>
			<button onClick={onUpdate}>Update</button>
		</div>
	);
}
