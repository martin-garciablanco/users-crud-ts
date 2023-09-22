import request from "supertest";

import app from "../../../src/app";
import { UserNotFoundError } from "../../../src/user/application/UserNotFoundError";
import { UserService } from "../../../src/user/application/UserService";
import { User } from "../../../src/user/domain/User";
import { UserRepository } from "../../../src/user/domain/UserRepository";
import { UserInMemoryRepository } from "../../../src/user/infra/UserInMemoryRepository";
import { UserDetailsRequest, UserRequest } from "../../../src/user/infra/UserRequest";
import {
	createRandomUser,
	createRandomUserRequest,
	userRequestStub,
	userStub,
} from "../userFixtures";

const usersRequest: UserRequest = userRequestStub;

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
				.then((response) => {
					expect(response.body).toEqual(usersRequest);
				});

			const createdUser: User = usersRepository.users.get(usersRequest.email) as User;

			expect(createdUser.name).toEqual(usersRequest.name);
			expect(createdUser.lastName).toEqual(usersRequest.lastName);
			expect(createdUser.email).toEqual(usersRequest.email);
			expect(createdUser.phoneNumber).toEqual(usersRequest.phoneNumber);
		});

		it("Should return an 400 status code trying to create an user that already exists through users post endpoint", async () => {
			const user = userStub;
			const createdUser: User = usersRepository.create(user).get();
			const createdUserRequest: UserRequest = {
				name: createdUser.name,
				lastName: createdUser.lastName,
				email: createdUser.email,
				phoneNumber: createdUser.phoneNumber,
			};

			await request(app).post("/users").send(createdUserRequest).expect(400);

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
					expect(response.body as Array<UserRequest>).toEqual([]);
				});
		});
		it("should show all users", async () => {
			const userOne = createRandomUserRequest();
			const userTwo = createRandomUserRequest();
			const userService = new UserService();
			userService.createUser(userOne);
			userService.createUser(userTwo);

			await request(app)
				.get("/users")
				.send()
				.expect(200)
				.then((response) => {
					expect(response.body).toContainEqual(userOne);
					expect(response.body).toContainEqual(userTwo);
					expect((response.body as UserRequest[]).length).toEqual(2);
				});
		});
	});

	describe("List user by email", () => {
		it("should show a saved user with same email", async () => {
			const user = createRandomUserRequest();
			const userService = new UserService();
			userService.createUser(user);

			await request(app)
				.get(`/users/${user.email}`)
				.send()
				.expect(200)
				.then(({ body }: { body: UserDetailsRequest }) => {
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
			const userRequest = createRandomUserRequest();
			const userRequestToUpdate = {
				...userRequest,
				lastName: "lastName",
			};
			const userService = new UserService();
			userService.createUser(userRequest);

			await request(app)
				.put(`/users/${userRequest.email}`)
				.send(userRequestToUpdate)
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual(userRequestToUpdate);
				});

			const userUpdated = userService.getUserByEmail(userRequest.email);
			expect(userUpdated.lastName).toEqual(userRequestToUpdate.lastName);
		});

		it("should return 404 given an email that does not exist", async () => {
			const wrongEmail = "wrong@email.com";
			const userRequest = createRandomUserRequest();
			const userNotFoundError = new UserNotFoundError();

			await request(app)
				.put(`/users/${wrongEmail}`)
				.send(userRequest)
				.expect(404)
				.then((response) => {
					expect(response.text).toContain(userNotFoundError.message);
				});
		});
	});
});
