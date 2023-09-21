import { EventService } from "../../../src/event/application/EventService";
import { Event, EventFactory } from "../../../src/event/domain/Event";
import { EventInMemoryRepository } from "../../../src/event/infra/EventInMemoryRepository";
import { eventStub } from "../eventFixture";

describe("EventService", () => {
	it("should create an event", () => {
		const event = eventStub;

		const repositoryCreateMock = jest.fn().mockImplementation(() => event);
		const factoryCreateMock = jest.fn().mockImplementation(() => event);
		EventFactory.create = factoryCreateMock;
		EventInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
			return {
				create: repositoryCreateMock,
			} as EventInMemoryRepository;
		});
		const eventService = new EventService();

		const createdEvent: Event = eventService.createEvent(event.userId, event.type, event.message);

		expect(repositoryCreateMock).toHaveBeenCalledTimes(1);
		expect(factoryCreateMock).toHaveBeenCalledTimes(1);
		expect(createdEvent).toEqual(event);
	});
});
