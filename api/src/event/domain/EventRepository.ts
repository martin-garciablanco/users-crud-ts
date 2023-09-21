import { UUID } from "crypto";

import { Event } from "./Event";

export interface EventRepository {
	events: Array<Event>;
	create(event: Event): Event;
	getByUserId(userId: UUID): Array<Event>;
}
