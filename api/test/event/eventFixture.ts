import { randomUUID } from "crypto";

import { Event } from "../../src/event/domain/Event";

export const eventStub: Event = {
	id: randomUUID(),
	userId: randomUUID(),
	type: "CREATE",
	message: "New event",
	time: new Date(),
};
