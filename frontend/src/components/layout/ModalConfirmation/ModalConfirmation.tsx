import styles from "./ModalConfirmation.module.scss";

interface ModalConfirmationProps {
	children: string | JSX.Element | JSX.Element[];
	accept: () => void;
	cancel: () => void;
}

export function ModalConfirmation(props: ModalConfirmationProps) {
	return (
		<div className={styles.modalConfirmation}>
			{props.children}
			<div className={styles.buttonsBlock}>
				<button className={styles.button} onClick={props.cancel}>
					Cancel
				</button>
				<button className={styles.button} onClick={props.accept}>
					Accept
				</button>
			</div>
		</div>
	);
}
