import request from "supertest";

import app from "../../../src/app";
import { UserService } from "../../../src/users/application/UserService";
import { User } from "../../../src/users/domain/User";
import { UserRepository } from "../../../src/users/domain/UserRepository";
import { UserInMemoryRepository } from "../../../src/users/infra/UserInMemoryRepository";
import { UserRequest } from "../../../src/users/infra/UserRequest";
import { createRandomUserRequest, userRequestStub, userStub } from "../userFixtures";

const usersRequest: UserRequest = userRequestStub;

let usersRepository: UserRepository;
describe("UsersController", () => {
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
});
