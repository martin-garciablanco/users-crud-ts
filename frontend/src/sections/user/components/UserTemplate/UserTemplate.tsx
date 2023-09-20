import { ChangeEvent, SetStateAction } from "react";

import { User } from "../../../../domain/User";

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
		<div>
			<div>
				<p>Email</p>
				<input type="text" value={user.email} onChange={(e) => onUserChange(e, "email")} />
			</div>
			<div>
				<p>Name</p>
				<input type="text" value={user.name} onChange={(e) => onUserChange(e, "")} />
			</div>
			<div>
				<p>Last name</p>
				<input type="text" value={user.lastName} onChange={(e) => onUserChange(e, "lastName")} />
			</div>
			<div>
				<p>Phone number</p>
				<input
					type="text"
					value={user.phoneNumber}
					onChange={(e) => onUserChange(e, "phoneNumber")}
				/>
			</div>
		</div>
	);
}
