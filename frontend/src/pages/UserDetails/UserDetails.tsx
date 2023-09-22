import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Modal } from "../../components/layout/Modal/Modal";
import { ModalConfirmation } from "../../components/layout/ModalConfirmation/ModalConfirmation";
import { NavBar } from "../../components/layout/NavBar/NavBar";
import { UpdateUser } from "../../components/user/UpdateUser/UpdateUser";
import { UserEventsTable } from "../../components/user/UserEventsTable/UserEventsTable";
import { UsersTable } from "../../components/user/UsersTable/UsersTable";
import { User } from "../../domain/User";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllUsers, getUserDetails, removeUser, updateUser } from "../../store/users/usersSlice";
import styles from "./UserDetails.module.scss";

export function UserDetails() {
	const { search } = useLocation();
	const navigate = useNavigate();
	const [userToUpdate, setUserToUpdate] = useState<User>({} as User);
	const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
	const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
	const userDetails = useAppSelector((state) => state.users.userDetails);
	const dispatch = useAppDispatch();

	const loadData = useCallback(
		async (email: string) => {
			await dispatch(getUserDetails(email));
		},
		[dispatch]
	);

	useEffect(() => {
		const query = new URLSearchParams(search);
		const email = query.get("email");
		if (!email) {
			navigate("/");
		} else if (!userDetails.email) {
			loadData(email);
		}
	}, [search, navigate, userDetails, loadData]);

	const openUpdateUserModal = () => {
		const userToUpdate = { ...userDetails };
		setUserToUpdate(userToUpdate);
		setShowUpdateUserModal(true);
	};

	const closeUpdateUserModal = () => {
		setShowUpdateUserModal(false);
	};

	const closeRemoveUserModal = () => {
		setShowRemoveUserModal(false);
	};

	const modifyUser = () => {
		dispatch(updateUser(userToUpdate));
		setShowUpdateUserModal(false);
	};

	const deleteUser = () => {
		dispatch(removeUser(userToUpdate));
		dispatch(getAllUsers());
		closeRemoveUserModal();
		navigate("/");
	};

	const removeUserModal = (user: User) => {
		setUserToUpdate(user);
		setShowRemoveUserModal(true);
	};

	return (
		<>
			<NavBar />
			<main className={styles.main}>
				<div className={styles.homeHeader}>
					<h2>User details</h2>
					{!userDetails.email ? (
						<p>User not foung</p>
					) : (
						<>
							<UsersTable
								users={[userDetails]}
								update={openUpdateUserModal}
								remove={removeUserModal}
							/>
							<div className={styles.eventsTable}>
								<UserEventsTable events={userDetails.events} />
							</div>
						</>
					)}
				</div>
			</main>
			<Modal show={showUpdateUserModal} onClose={closeUpdateUserModal}>
				<UpdateUser
					userToUpdate={userToUpdate}
					setUserToTupdate={setUserToUpdate}
					cancel={closeUpdateUserModal}
					update={modifyUser}
				/>
			</Modal>
			<Modal show={showRemoveUserModal} onClose={closeRemoveUserModal}>
				<ModalConfirmation accept={deleteUser} cancel={closeRemoveUserModal}>
					{`Do you want to permanetly delete ${userToUpdate.email}`}
				</ModalConfirmation>
			</Modal>
		</>
	);
}
