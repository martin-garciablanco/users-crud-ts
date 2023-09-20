import styles from "./Modal.module.scss";

interface ModalProps {
	children: string | JSX.Element | JSX.Element[];
	show: boolean;
	onClose: () => void;
}

export function Modal(props: ModalProps) {
	return (
		<>
			{props.show && (
				<div className={styles.modal}>
					<button className={styles.closeButton} onClick={props.onClose}>
						x
					</button>
					{props.children}
				</div>
			)}
		</>
	);
}
