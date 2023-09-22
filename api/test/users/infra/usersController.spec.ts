import request from "supertest";

import app from "../../../src/app";
import { UserDTO, UserDTOFactory } from "../../../src/user/application/UserDTO";
import { UserNotFoundError } from "../../../src/user/application/UserNotFoundError";
import { UserService } from "../../../src/user/application/UserService";
import { User } from "../../../src/user/domain/User";
import { UserRepository } from "../../../src/user/domain/UserRepository";
import { UserInMemoryRepository } from "../../../src/user/infra/UserInMemoryRepository";
import { createRandomUser, createRandomUserDTO, userDTOStub, userStub } from "../userFixtures";

const usersRequest: UserDTO = userDTOStub;

let usersRepository: UserRepository;
describe("UserController", () => {
	beforeEach(() => {
		usersRepository = UserInMemoryRepository.initialize();
		usersRepository.users.clear();
	});

	describe("Create users", () => {
		it("Should create an User in our inMemory impl receiving the data through users post endpoint", async () => {
			await request(app)
				.post("/users")
				.send(usersRequest)
				.expect(201)
				.then(({ body }: { body: UserDTO }) => {
					expect(body.email).toEqual(usersRequest.email);
					expect(body.lastName).toEqual(usersRequest.lastName);
					expect(body.name).toEqual(usersRequest.name);
					expect(body.phoneNumber).toEqual(usersRequest.phoneNumber);
					expect(body.events.length).toEqual(1);
					expect(body.events[0].type).toEqual("CREATE");
				});
		});

		it("Should return an 400 status code trying to create an user that already exists through users post endpoint", async () => {
			const user = userStub;
			const createdUser: User = usersRepository.create(user).get();
			const createdUserDTO = UserDTOFactory.createFromUser(createdUser);

			await request(app).post("/users").send(createdUserDTO).expect(400);

			expect(usersRepository.users.size).toEqual(1);
		});
	});

	describe("List users", () => {
		it("should show an empty array of users", async () => {
			await request(app)
				.get("/users")
				.send()
				.expect(200)
				.then((response) => {
					expect(response.body as Array<UserDTO>).toEqual([]);
				});
		});
		it("should show all users", async () => {
			const user = createRandomUserDTO();
			const userService = new UserService();
			userService.createUser(user);

			await request(app)
				.get("/users")
				.send()
				.expect(200)
				.then(({ body }: { body: Array<UserDTO> }) => {
					const userRetrieved = body[0];
					expect(userRetrieved.email).toEqual(user.email);
					expect(userRetrieved.lastName).toEqual(user.lastName);
					expect(userRetrieved.name).toEqual(user.name);
					expect(userRetrieved.phoneNumber).toEqual(user.phoneNumber);
					expect(userRetrieved.events.length).toEqual(1);
					expect(userRetrieved.events[0].type).toEqual("CREATE");
					expect(body.length).toEqual(1);
				});
		});
	});

	describe("List user by email", () => {
		it("should show a saved user with same email", async () => {
			const user = createRandomUserDTO();
			const userService = new UserService();
			userService.createUser(user);

			await request(app)
				.get(`/users/${user.email}`)
				.send()
				.expect(200)
				.then(({ body }: { body: UserDTO }) => {
					expect(body.name).toEqual(user.name);
					expect(body.lastName).toEqual(user.lastName);
					expect(body.phoneNumber).toEqual(user.phoneNumber);
					expect(body.events[0].type).toEqual("CREATE");
				});
		});

		it("should return 404 given an email that does not exist", async () => {
			const wrongEmail = "wrong@email.com";
			const userNotFoundError = new UserNotFoundError();

			await request(app)
				.get(`/users/${wrongEmail}`)
				.send()
				.expect(404)
				.then((response) => {
					expect(response.text).toContain(userNotFoundError.message);
				});
		});
	});

	describe("Remove user by email", () => {
		it("should remove a saved user given his email", async () => {
			const user = createRandomUser();
			usersRepository.create(user);
			await request(app).delete(`/users/${user.email}`).expect(200);

			const userRemoved = usersRepository.getByEmail(user.email);
			expect(userRemoved.isEmpty()).toBeTruthy();
		});

		it("should return 404 given an email that does not exist", async () => {
			const wrongEmail = "wrong@email.com";
			const userNotFoundError = new UserNotFoundError();

			await request(app)
				.delete(`/users/${wrongEmail}`)
				.send()
				.expect(404)
				.then((response) => {
					expect(response.text).toContain(userNotFoundError.message);
				});
		});
	});

	describe("Update user by email", () => {
		it("should update a saved user given his email", async () => {
			const userDTO = createRandomUserDTO();
			const userDTOToUpdate = {
				...userDTO,
				lastName: "lastName",
			};
			const userService = new UserService();
			userService.createUser(userDTO);

			await request(app)
				.put(`/users/${userDTO.email}`)
				.send(userDTOToUpdate)
				.expect(200)
				.then(({ body }: { body: UserDTO }) => {
					expect(body.lastName).toEqual(userDTOToUpdate.lastName);
					expect(body.events.length).toEqual(2);
				});

			const userUpdated = userService.getUserByEmail(userDTO.email);
			expect(userUpdated.lastName).toEqual(userDTOToUpdate.lastName);
		});

		it("should return 404 given an email that does not exist", async () => {
			const wrongEmail = "wrong@email.com";
			const userDTO = createRandomUserDTO();
			const userNotFoundError = new UserNotFoundError();

			await request(app)
				.put(`/users/${wrongEmail}`)
				.send(userDTO)
				.expect(404)
				.then((response) => {
					expect(response.text).toContain(userNotFoundError.message);
				});
		});
	});
});
