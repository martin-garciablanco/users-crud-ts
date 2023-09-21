import { UUID } from "crypto";

import { Event } from "../domain/Event";
import { EventRepository } from "../domain/EventRepository";

class EventInMemoryRepositoryImpl implements EventRepository {
	events: Array<Event>;

	constructor(events: Array<Event> = []) {
		this.events = events;
	}

	create(event: Event): Event {
		this.events.push(event);

		return event;
	}

	getByUserId(userId: UUID): Array<Event> {
		return this.events.filter((event) => event.userId === userId);
	}
}

export class EventInMemoryRepository {
	private static repository: EventRepository | undefined;

	static initialize(events: Array<Event> = []): EventRepository {
		if (this.repository) {
			return this.repository;
		}
		this.repository = new EventInMemoryRepositoryImpl(events);

		return this.repository;
	}
}
