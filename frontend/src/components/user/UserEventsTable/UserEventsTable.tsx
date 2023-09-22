import { Event } from "../../../domain/Event";
import styles from "./UserEventsTable.module.scss";

interface UserEventsTableProps {
	events: Array<Event>;
}

export function UserEventsTable({ events }: UserEventsTableProps) {
	return (
		<table>
			<thead>
				<tr>
					<th>Time</th>
					<th>Type</th>
					<th>Message</th>
				</tr>
			</thead>
			<tbody>
				{events.map((event, index) => {
					return (
						<tr key={index}>
							<td>{String(event.time)}</td>
							<td>{event.type}</td>
							<td className={styles.eventMessage}>{event.message}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
