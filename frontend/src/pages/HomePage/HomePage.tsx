import { useState } from "react";

import { User } from "../../domain/User";
import { Modal } from "../../sections/layout/components/Modal/Modal";
import { NavBar } from "../../sections/layout/components/NavBar/NavBar";
import { CreateUser } from "../../sections/user/components/CreateUser/CreateUser";
import { UpdateUser } from "../../sections/user/components/UpdateUser/UpdateUser";
import { UsersTable } from "../../sections/user/components/UsersTable/UsersTable";
import styles from "./HomePage.module.scss";

export function HomePage() {
	const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
	const [showCreateUserModal, setShowCreateUserModal] = useState(false);
	const [userToUpdate, setUserToUpdate] = useState<User>({} as User);

	const onCloseUpdateModal = () => {
		setShowUpdateUserModal(false);
	};

	const onCloseCreateModal = () => {
		setShowCreateUserModal(false);
	};

	const onUpdateUser = () => {
		// eslint-disable-next-line no-console, @typescript-eslint/restrict-template-expressions
		console.log(`do things for updating user: ${userToUpdate}`);
		setShowUpdateUserModal(false);
	};

	const onCreateUser = () => {
		// eslint-disable-next-line no-console, @typescript-eslint/restrict-template-expressions
		console.log(`do things for creating an user: ${userToUpdate}`);
		setShowCreateUserModal(false);
	};

	const openUpdateUserModal = (user: User) => {
		setUserToUpdate(user);
		setShowUpdateUserModal(true);
	};

	const onOpenCreateUserModal = () => {
		setUserToUpdate({} as User);
		setShowCreateUserModal(true);
	};

	return (
		<>
			<NavBar />
			<main className={styles.main}>
				<div className={styles.homeHeader}>
					<h2>Current users</h2>
					<button className={styles.newUserButton} onClick={onOpenCreateUserModal}>
						Create User
					</button>
				</div>
				<UsersTable updateUser={openUpdateUserModal} />

				<Modal show={showUpdateUserModal} onClose={onCloseUpdateModal}>
					<UpdateUser
						userToUpdate={userToUpdate}
						setUserToTupdate={setUserToUpdate}
						onCancel={onCloseUpdateModal}
						onUpdate={onUpdateUser}
					/>
				</Modal>
				<Modal show={showCreateUserModal} onClose={onCloseCreateModal}>
					<CreateUser
						userToUpdate={userToUpdate}
						setUserToTupdate={setUserToUpdate}
						onCancel={onCloseCreateModal}
						onCreate={onCreateUser}
					/>
				</Modal>
			</main>
		</>
	);
}
