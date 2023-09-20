import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { User } from "../../domain/User";
import { Modal } from "../../sections/layout/components/Modal/Modal";
import { NavBar } from "../../sections/layout/components/NavBar/NavBar";
import { UpdateUser } from "../../sections/user/components/UpdateUser/UpdateUser";
import { UsersTable } from "../../sections/user/components/UsersTable/UsersTable";
import styles from "./UserDetails.module.scss";

export function UserDetails() {
	const { search } = useLocation();
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [user, setUser] = useState<User>({} as User);
	const [userToUpdate, setUserToUpdate] = useState<User>({} as User);
	const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

	useEffect(() => {
		const query = new URLSearchParams(search);
		const email = query.get("email");
		if (!email) {
			navigate("/");
		} else {
			setEmail(email);
			// getUser
			setUser({
				email: "javi@mail.com",
				name: "Javi",
				lastName: "Lopez",
				phoneNumber: "666555444",
			});
		}
	}, [search, navigate]);

	const openUpdateUserModal = () => {
		const userToUpdate = { ...user };
		setUserToUpdate(userToUpdate);
		setShowUpdateUserModal(true);
	};

	const onCloseUpdateModal = () => {
		setShowUpdateUserModal(false);
	};

	const onUpdateUser = () => {
		// update user on api
		setShowUpdateUserModal(false);
	};

	return (
		<>
			<NavBar />
			<main className={styles.main}>
				<div className={styles.homeHeader}>
					<h2>User details</h2>
					<h3>eeemail {email}</h3>

					<UsersTable users={[user]} updateUser={openUpdateUserModal} enableSeeDetails={false} />
				</div>
			</main>
			<Modal show={showUpdateUserModal} onClose={onCloseUpdateModal}>
				<UpdateUser
					userToUpdate={userToUpdate}
					setUserToTupdate={setUserToUpdate}
					onCancel={onCloseUpdateModal}
					onUpdate={onUpdateUser}
				/>
			</Modal>
		</>
	);
}
