import { UUID } from "crypto";

import { EventFactory, EventType } from "../domain/Event";
import { EventRepository } from "../domain/EventRepository";
import { EventInMemoryRepository } from "../infra/EventInMemoryRepository";
import { EventDTO, EventDTOFactory } from "./EventDTO";

export class EventService {
	private readonly eventRepository: EventRepository;

	constructor() {
		this.eventRepository = EventInMemoryRepository.initialize();
	}

	createEvent(userId: UUID, type: EventType, message: string): EventDTO {
		const event = EventFactory.create(userId, type, message);
		const createdEvent = this.eventRepository.create(event);

		return EventDTOFactory.createFromEvent(createdEvent);
	}

	getEventsByUserId(userId: UUID): Array<EventDTO> {
		return this.eventRepository
			.getByUserId(userId)
			.map((event) => EventDTOFactory.createFromEvent(event));
	}
}
