import { NavBar } from "../../sections/layout/components/NavBar/NavBar";
import { UsersTable } from "../../sections/user/components/UsersTable/UsersTable";
import styles from "./HomePage.module.scss";

export function HomePage() {
	return (
		<>
			<NavBar />
			<main className={styles.main}>
				<h2>Current users</h2>
				<UsersTable />
			</main>
		</>
	);
}
