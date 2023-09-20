import { User } from "../../../../domain/User";
import styles from "./UserCard.module.scss";

export function UserCard({ user: { name, lastName, phoneNumber, email } }: { user: User }) {
	return (
		<div className={styles.userCard}>
			<p>{email}</p>
			<p>{name}</p>
			<p>{lastName}</p>
			<p>{phoneNumber}</p>
		</div>
	);
}
