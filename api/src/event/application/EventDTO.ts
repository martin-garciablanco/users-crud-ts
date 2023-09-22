import { Event, EventType } from "../../event/domain/Event";

export interface EventDTO {
	type: EventType;
	time: Date;
	message: string;
}

export class EventDTOFactory {
	static createFromEvent({ message, time, type }: Event): EventDTO {
		return { message, time, type };
	}
}
