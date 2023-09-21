import { randomUUID, UUID } from "crypto";

export type EventType = "CREATE" | "UPDATE";

export interface Event {
	id: UUID;
	userId: UUID;
	type: EventType;
	time: Date;
	message: string;
}

export class EventFactory {
	static create({
		userId,
		type,
		message,
	}: {
		userId: UUID;
		type: EventType;
		message: string;
	}): Event {
		return { id: randomUUID(), userId, type, message, time: new Date() };
	}
}
