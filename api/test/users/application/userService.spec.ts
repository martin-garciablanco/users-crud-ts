import { randomUUID } from "crypto";
import { Optional } from "typescript-optional";

import { EventService } from "../../../src/event/application/EventService";
import { UserAlreadyExistsError } from "../../../src/user/application/UserAlreadyExistsError";
import { UserNotFoundError } from "../../../src/user/application/UserNotFoundError";
import { UserService } from "../../../src/user/application/UserService";
import { UserFactory } from "../../../src/user/domain/User";
import { UserInMemoryRepository } from "../../../src/user/infra/UserInMemoryRepository";
import { UserRequest, UserRequestFactory } from "../../../src/user/infra/UserRequest";
import { createRandomUser, createRandomUserRequest, userRequestStub } from "../userFixtures";

jest.mock("../../../src/event/application/EventService");
const eventService = EventService as jest.Mock<EventService>;
const createEventMock = jest.fn();
const getEventsByUserIdMock = jest.fn().mockImplementation(() => []);

describe("UserService", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("createUser", () => {
		it("should create an user", () => {
			const userRequest: UserRequest = userRequestStub;
			const userCreatedStub = {
				id: randomUUID(),
				name: userRequest.name,
				lastName: userRequest.lastName,
				email: userRequest.email,
				phoneNumber: userRequest.phoneNumber,
			};
			const repositoryCreateMock = jest.fn().mockImplementation(() => Optional.of(userCreatedStub));
			const factoryCreateMock = jest.fn().mockImplementation(() => userCreatedStub);
			UserFactory.create = factoryCreateMock;
			eventService.mockImplementation(() => {
				return {
					createEvent: createEventMock,
					getEventsByUserId: getEventsByUserIdMock,
				} as unknown as EventService;
			});
			UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
				return {
					create: repositoryCreateMock,
				} as UserInMemoryRepository;
			});
			const userService = new UserService();

			const createdUser = userService.createUser(userRequest);

			expect(repositoryCreateMock).toHaveBeenCalledTimes(1);
			expect(factoryCreateMock).toHaveBeenCalledTimes(1);
			expect(createEventMock).toHaveBeenCalledTimes(1);
			expect(createdUser).toEqual(userRequest);
		});

		it("should through an exeption if user already exist", () => {
			const userRequest: UserRequest = userRequestStub;
			UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
				return {
					create: jest.fn().mockImplementation(() => Optional.empty()),
				} as UserInMemoryRepository;
			});

			const userService = new UserService();
			const error = new UserAlreadyExistsError();

			expect(() => userService.createUser(userRequest)).toThrowError(error.message);
		});
	});

	describe("getUsers", () => {
		it("should return empty array when no users found", () => {
			UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
				return {
					getAll: jest.fn().mockImplementation(() => []),
				} as UserInMemoryRepository;
			});

			const userService = new UserService();
			const emptyArrayOfUsers = userService.getAllUsers();

			expect(emptyArrayOfUsers).toEqual([]);
		});

		it("should return an array of saved users", () => {
			const userOne = createRandomUser();
			const userTwo = createRandomUser();
			UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
				return {
					getAll: jest.fn().mockImplementation(() => [userOne, userTwo]),
				} as UserInMemoryRepository;
			});
			eventService.mockImplementation(() => {
				return {
					getEventsByUserId: getEventsByUserIdMock,
				} as unknown as EventService;
			});

			const userService = new UserService();
			const arrayOfUserRequest = userService.getAllUsers();

			expect(arrayOfUserRequest.length).toEqual(2);
			expect(getEventsByUserIdMock).toHaveBeenCalledTimes(2);
		});
	});
	describe("getUserByEmail", () => {
		it("should throw an error when user not found", () => {
			UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
				return {
					getByEmail: jest.fn().mockImplementation(() => Optional.empty()),
				} as UserInMemoryRepository;
			});
			const error = new UserNotFoundError();
			const userService = new UserService();
			const wrongEmail = "wrong@email.com";

			expect(() => userService.getUserByEmail(wrongEmail)).toThrowError(error.message);
		});

		it("should return an userRequest given a proper email", () => {
			const user = createRandomUser();
			UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
				return {
					getByEmail: jest.fn().mockImplementation(() => Optional.of(user)),
				} as UserInMemoryRepository;
			});
			eventService.mockImplementation(() => {
				return {
					getEventsByUserId: getEventsByUserIdMock,
				} as unknown as EventService;
			});
			const userService = new UserService();

			const foundUserRequest = userService.getUserByEmail(user.email);

			expect(foundUserRequest).toEqual(UserRequestFactory.createFromUser(user, []));
		});
	});

	describe("removeUserByEmail", () => {
		it("should throw an error when user not found", () => {
			UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
				return {
					deleteByEmail: jest.fn().mockImplementation(() => Optional.empty()),
				} as UserInMemoryRepository;
			});
			const error = new UserNotFoundError();
			const userService = new UserService();
			const wrongEmail = "wrong@email.com";

			expect(() => userService.deleteUserByEmail(wrongEmail)).toThrowError(error.message);
		});

		it("should delete an user given his email", () => {
			const user = createRandomUser();
			UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
				return {
					deleteByEmail: jest.fn().mockImplementation(() => Optional.of(user.email)),
				} as UserInMemoryRepository;
			});
			const userService = new UserService();

			const deletedUserEmail = userService.deleteUserByEmail(user.email);

			expect(deletedUserEmail).toEqual(user.email);
		});
	});

	describe("updateUserByEmail", () => {
		it("should throw an error when user not found", () => {
			UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
				return {
					getByEmail: jest.fn().mockImplementation(() => Optional.empty()),
				} as UserInMemoryRepository;
			});
			const userRequestToUpdate = createRandomUserRequest();
			const error = new UserNotFoundError();
			const userService = new UserService();

			expect(() => userService.updateUserByEmail(userRequestToUpdate)).toThrowError(error.message);
		});

		it("should update an user given his email", () => {
			const user = createRandomUser();
			const userRequest = UserRequestFactory.createFromUser(user);
			eventService.mockImplementation(() => {
				return {
					createEvent: createEventMock,
					getEventsByUserId: getEventsByUserIdMock,
				} as unknown as EventService;
			});
			UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
				return {
					getByEmail: jest.fn().mockImplementation(() => Optional.of(user.email)),
					updateByEmail: jest.fn().mockImplementation(() => Optional.of(user)),
				} as UserInMemoryRepository;
			});

			const userService = new UserService();
			const updatedUserEmail = userService.updateUserByEmail(userRequest);

			expect(createEventMock).toHaveBeenCalledTimes(1);
			expect(getEventsByUserIdMock).toHaveBeenCalledTimes(1);
			expect(updatedUserEmail).toEqual(userRequest);
		});
	});
});
