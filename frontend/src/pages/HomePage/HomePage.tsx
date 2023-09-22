import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Modal } from "../../components/layout/Modal/Modal";
import { ModalConfirmation } from "../../components/layout/ModalConfirmation/ModalConfirmation";
import { NavBar } from "../../components/layout/NavBar/NavBar";
import { UsersTable } from "../../components/user/UsersTable/UsersTable";
import { UserTemplate } from "../../components/user/UserTemplate/UserTemplate";
import { User } from "../../domain/User";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
	createUser,
	getAllUsers,
	removeUser,
	setUserDetails,
	updateUser,
} from "../../store/users/usersSlice";
import styles from "./HomePage.module.scss";

export function HomePage() {
	const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
	const [showCreateUserModal, setShowCreateUserModal] = useState(false);
	const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
	const [userToUpdate, setUserToUpdate] = useState<User>({} as User);
	const users = useAppSelector((state) => state.users.users);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	const closeUpdateModal = () => {
		setShowUpdateUserModal(false);
	};

	const closeCreateModal = () => {
		setShowCreateUserModal(false);
	};

	const closeRemoveUserModal = () => {
		setShowRemoveUserModal(false);
	};

	const openUpdateUserModal = (user: User) => {
		setUserToUpdate(user);
		setShowUpdateUserModal(true);
	};

	const openCreateUserModal = () => {
		setUserToUpdate({} as User);
		setShowCreateUserModal(true);
	};

	const removeUserModal = (user: User) => {
		setUserToUpdate(user);
		setShowRemoveUserModal(true);
	};

	const modifyUser = async () => {
		await dispatch(updateUser(userToUpdate));
		await dispatch(getAllUsers());
		setShowUpdateUserModal(false);
	};

	const createNewUser = async () => {
		await dispatch(createUser(userToUpdate));
		await dispatch(getAllUsers());
		setShowCreateUserModal(false);
	};

	const deleteUser = async () => {
		await dispatch(removeUser(userToUpdate));
		await dispatch(getAllUsers());
		closeRemoveUserModal();
	};

	const seeUserDetails = (user: User) => {
		dispatch(setUserDetails(user));
		navigate(`/users?email=${user.email}`);
	};

	return (
		<>
			<NavBar />
			<main className={styles.main}>
				<div className={styles.homeHeader}>
					<h2 className={styles.pageSubtitle}>Current users</h2>
					<button className={styles.newUserButton} onClick={openCreateUserModal}>
						Create User
					</button>
				</div>
				<UsersTable
					users={users}
					update={openUpdateUserModal}
					remove={removeUserModal}
					seeDetails={seeUserDetails}
				/>

				<Modal show={showUpdateUserModal} onClose={closeUpdateModal}>
					<UserTemplate
						user={userToUpdate}
						setUser={setUserToUpdate}
						cancel={closeUpdateModal}
						accept={modifyUser}
						emailDisabled={true}
					/>
				</Modal>
				<Modal show={showCreateUserModal} onClose={closeCreateModal}>
					<UserTemplate
						user={userToUpdate}
						setUser={setUserToUpdate}
						cancel={closeCreateModal}
						accept={createNewUser}
					/>
				</Modal>
				<Modal show={showRemoveUserModal} onClose={closeRemoveUserModal}>
					<ModalConfirmation accept={deleteUser} cancel={closeRemoveUserModal}>
						{`Do you want to permanetly delete ${userToUpdate.email}`}
					</ModalConfirmation>
				</Modal>
			</main>
		</>
	);
}
