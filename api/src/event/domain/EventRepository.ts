import { Event } from "./Event";

export interface EventRepository {
	events: Array<Event>;
	create(event: Event): Event;
}
