import { Event } from "../../../src/event/domain/Event";
import { EventRepository } from "../../../src/event/domain/EventRepository";
import { EventInMemoryRepository } from "../../../src/event/infra/EventInMemoryRepository";
import { eventStub } from "../eventFixture";

let eventRepository: EventRepository;
let event: Event;
describe("UserRepository", () => {
	beforeEach(() => {
		eventRepository = EventInMemoryRepository.initialize();
		eventRepository.events = [];
		event = eventStub;
	});

	it("should be empty at the beginning", () => {
		expect(eventRepository.events.length).toEqual(0);
	});

	describe("create", () => {
		it("should create an event", () => {
			const createdEvent = eventRepository.create(event);
			expect(eventRepository.events[0]).toEqual(createdEvent);
			expect(eventRepository.events.length).toEqual(1);
		});
	});
});
