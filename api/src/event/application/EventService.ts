import { UUID } from "crypto";

import { Event, EventFactory, EventType } from "../domain/Event";
import { EventRepository } from "../domain/EventRepository";
import { EventInMemoryRepository } from "../infra/EventInMemoryRepository";

export class EventService {
	private readonly eventRepository: EventRepository;

	constructor() {
		this.eventRepository = EventInMemoryRepository.initialize();
	}

	createEvent(userId: UUID, type: EventType, message: string): Event {
		const event = EventFactory.create(userId, type, message);

		return this.eventRepository.create(event);
	}
}
