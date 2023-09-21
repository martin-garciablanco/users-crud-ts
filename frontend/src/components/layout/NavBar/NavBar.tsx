import { Link } from "react-router-dom";

import styles from "./NavBar.module.scss";

export function NavBar() {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>Dashboard of users</h1>
			<div className={styles.menu}>
				<Link to={"/"} className={styles.menuItem}>
					Home
				</Link>
			</div>
		</header>
	);
}
