import styles from "./ModalConfirmation.module.scss";

interface ModalConfirmationProps {
	children: string | JSX.Element | JSX.Element[];
	onAccept: () => void;
	onCancel: () => void;
}

export function ModalConfirmation(props: ModalConfirmationProps) {
	return (
		<div className={styles.modalConfirmation}>
			{props.children}
			<div className={styles.buttonsBlock}>
				<button className={styles.button} onClick={props.onCancel}>
					Cancel
				</button>
				<button className={styles.button} onClick={props.onAccept}>
					Accept
				</button>
			</div>
		</div>
	);
}
