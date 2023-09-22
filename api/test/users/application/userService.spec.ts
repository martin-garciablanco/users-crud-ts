import { randomUUID } from "crypto";
import { Optional } from "typescript-optional";

import { EventService } from "../../../src/event/application/EventService";
import { UserAlreadyExistsError } from "../../../src/user/application/UserAlreadyExistsError";
import { UserDTO, UserDTOFactory } from "../../../src/user/application/UserDTO";
import { UserNotFoundError } from "../../../src/user/application/UserNotFoundError";
import { UserService } from "../../../src/user/application/UserService";
import { UserFactory } from "../../../src/user/domain/User";
import { UserInMemoryRepository } from "../../../src/user/infra/UserInMemoryRepository";
import { createRandomUser, createRandomUserDTO, userDTOStub } from "../userFixtures";

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
			const userDTO: UserDTO = userDTOStub;
			const userCreatedStub = {
				id: randomUUID(),
				name: userDTO.name,
				lastName: userDTO.lastName,
				email: userDTO.email,
				phoneNumber: userDTO.phoneNumber,
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

			const createdUser = userService.createUser(userDTO);

			expect(repositoryCreateMock).toHaveBeenCalledTimes(1);
			expect(factoryCreateMock).toHaveBeenCalledTimes(1);
			expect(createEventMock).toHaveBeenCalledTimes(1);
			expect(createdUser).toEqual(userDTO);
		});

		it("should through an exeption if user already exist", () => {
			const userDTO: UserDTO = userDTOStub;
			UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
				return {
					create: jest.fn().mockImplementation(() => Optional.empty()),
				} as UserInMemoryRepository;
			});

			const userService = new UserService();
			const error = new UserAlreadyExistsError();

			expect(() => userService.createUser(userDTO)).toThrowError(error.message);
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
			const arrayOfUserDTO = userService.getAllUsers();

			expect(arrayOfUserDTO.length).toEqual(2);
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

		it("should return an userDTO given a proper email", () => {
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

			const foundUserDTO = userService.getUserByEmail(user.email);

			expect(foundUserDTO).toEqual(UserDTOFactory.createFromUser(user, []));
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
			const userDTOToUpdate = createRandomUserDTO();
			const error = new UserNotFoundError();
			const userService = new UserService();

			expect(() => userService.updateUserByEmail(userDTOToUpdate)).toThrowError(error.message);
		});

		it("should update an user given his email", () => {
			const user = createRandomUser();
			const userDTO = UserDTOFactory.createFromUser(user);
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
			const updatedUserEmail = userService.updateUserByEmail(userDTO);

			expect(createEventMock).toHaveBeenCalledTimes(1);
			expect(getEventsByUserIdMock).toHaveBeenCalledTimes(1);
			expect(updatedUserEmail).toEqual(userDTO);
		});
	});
});
