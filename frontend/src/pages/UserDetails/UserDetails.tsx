import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Modal } from "../../components/layout/Modal/Modal";
import { ModalConfirmation } from "../../components/layout/ModalConfirmation/ModalConfirmation";
import { NavBar } from "../../components/layout/NavBar/NavBar";
import { UpdateUser } from "../../components/user/UpdateUser/UpdateUser";
import { UsersTable } from "../../components/user/UsersTable/UsersTable";
import { User } from "../../domain/User";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllUsers, getUserDetails, removeUser, updateUser } from "../../store/users/usersSlice";
import styles from "./UserDetails.module.scss";

export function UserDetails() {
	const { search } = useLocation();
	const navigate = useNavigate();
	const [user, setUser] = useState<User>({} as User);
	const [userToUpdate, setUserToUpdate] = useState<User>({} as User);
	const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
	const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
	const userDetails = useAppSelector((state) => state.users.userDetails);
	const dispatch = useAppDispatch();

	const loadData = async (email: string) => {
		await dispatch(getUserDetails(email));
		setUser(userDetails);
	};

	useEffect(() => {
		const query = new URLSearchParams(search);
		const email = query.get("email");
		if (!email) {
			navigate("/");
		} else {
			userDetails.email ? setUser(userDetails) : loadData(email);
		}
	}, [search, navigate, userDetails, loadData]);

	const openUpdateUserModal = () => {
		const userToUpdate = { ...user };
		setUserToUpdate(userToUpdate);
		setShowUpdateUserModal(true);
	};

	const closeUpdateUserModal = () => {
		setShowUpdateUserModal(false);
	};

	const closeRemoveUserModal = () => {
		setShowRemoveUserModal(false);
	};

	const modifyUser = async () => {
		await dispatch(updateUser(userToUpdate));
		setShowUpdateUserModal(false);
	};

	const deleteUser = async () => {
		await dispatch(removeUser(userToUpdate));
		await dispatch(getAllUsers());
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
					<UsersTable
						users={[user]}
						update={openUpdateUserModal}
						remove={removeUserModal}
						enableSeeDetails={false}
					/>
				</div>
			</main>
			<Modal show={showUpdateUserModal} onClose={closeUpdateUserModal}>
				<UpdateUser
					userToUpdate={userToUpdate}
					setUserToTupdate={setUserToUpdate}
					onCancel={closeUpdateUserModal}
					onUpdate={modifyUser}
				/>
			</Modal>
			<Modal show={showRemoveUserModal} onClose={closeRemoveUserModal}>
				<ModalConfirmation onAccept={deleteUser} onCancel={closeRemoveUserModal}>
					{`Do you want to permanetly delete ${userToUpdate.email}`}
				</ModalConfirmation>
			</Modal>
		</>
	);
}
