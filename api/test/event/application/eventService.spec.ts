import { EventDTOFactory } from "../../../src/event/application/EventDTO";
import { EventService } from "../../../src/event/application/EventService";
import { EventFactory } from "../../../src/event/domain/Event";
import { EventInMemoryRepository } from "../../../src/event/infra/EventInMemoryRepository";
import { eventStub } from "../eventFixture";

describe("EventService", () => {
	it("should create an event", () => {
		const event = eventStub;
		const eventDTO = EventDTOFactory.createFromEvent(event);

		const repositoryCreateMock = jest.fn().mockImplementation(() => event);
		const factoryCreateMock = jest.fn().mockImplementation(() => event);
		EventFactory.create = factoryCreateMock;
		EventInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
			return {
				create: repositoryCreateMock,
			} as EventInMemoryRepository;
		});
		const eventService = new EventService();

		const createdEventDTO = eventService.createEvent(event.userId, event.type, event.message);

		expect(repositoryCreateMock).toHaveBeenCalledTimes(1);
		expect(factoryCreateMock).toHaveBeenCalledTimes(1);
		expect(createdEventDTO).toEqual(eventDTO);
	});

	it("should return events given an userId", () => {
		const event = eventStub;
		const eventDTO = EventDTOFactory.createFromEvent(event);
		const getByIdMock = jest.fn().mockImplementation(() => [event]);
		EventInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
			return {
				getByUserId: getByIdMock,
			} as EventInMemoryRepository;
		});
		const eventService = new EventService();

		const events = eventService.getEventsByUserId(event.userId);
		expect(events.length).toEqual(1);
		expect(events[0]).toEqual(eventDTO);
	});
});
