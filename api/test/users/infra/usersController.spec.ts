import request from "supertest";

import app from "../../../src/app";
import { User } from "../../../src/users/domain/User";
import { UserInMemoryRepository } from "../../../src/users/infra/UserInMemoryRepository";
import { UserRequest } from "../../../src/users/infra/UserRequest";
import { userRequestStub } from "../userFixtures";

const userRequest: UserRequest = userRequestStub;

describe("UsersController", () => {
	it("Should create an User in our inMemory impl receiving the data through users post endpoint", async () => {
		await request(app)
			.post("/users")
			.send(userRequest)
			.expect(201)
			.then((response) => {
				expect(response.body).toEqual(userRequest);
			});

		const usersRepository = UserInMemoryRepository.initialize();
		const createdUser: User = usersRepository.users.get(userRequest.email) as User;

		expect(createdUser.name).toEqual(userRequest.name);
		expect(createdUser.lastName).toEqual(userRequest.lastName);
		expect(createdUser.email).toEqual(userRequest.email);
		expect(createdUser.phoneNumber).toEqual(userRequest.phoneNumber);
	});
});
