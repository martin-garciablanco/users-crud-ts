import { useState } from "react";

import { Modal } from "../../components/layout/components/Modal/Modal";
import { NavBar } from "../../components/layout/components/NavBar/NavBar";
import { CreateUser } from "../../components/user/CreateUser/CreateUser";
import { UpdateUser } from "../../components/user/UpdateUser/UpdateUser";
import { UsersTable } from "../../components/user/UsersTable/UsersTable";
import { User } from "../../domain/User";
import styles from "./HomePage.module.scss";

const users: Array<User> = [
	{ email: "javi@mail.com", name: "Javi", lastName: "Lopez", phoneNumber: "666555444" },
	{ email: "anna@mail.com", name: "Anna", lastName: "Pisuerga", phoneNumber: "888999777" },
];

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
				<UsersTable users={users} updateUser={openUpdateUserModal} enableSeeDetails={true} />

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
