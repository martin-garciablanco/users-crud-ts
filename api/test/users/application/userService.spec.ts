import { randomUUID } from "crypto";
import { Optional } from "typescript-optional";

import { UserService } from "../../../src/users/application/UserService";
import { UserFactory } from "../../../src/users/domain/UserFactory";
import { UserInMemoryRepository } from "../../../src/users/infra/UserInMemoryRepository";
import { UserRequest } from "../../../src/users/infra/UserRequest";
import { userRequestStub } from "../userFixtures";

describe("UserService", () => {
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
		UserInMemoryRepository.initialize = jest.fn().mockImplementation(() => {
			return {
				create: repositoryCreateMock,
			} as UserInMemoryRepository;
		});
		const userService = new UserService();

		const createdUser = userService.createUser(userRequest);

		expect(repositoryCreateMock).toHaveBeenCalledTimes(1);
		expect(factoryCreateMock).toHaveBeenCalledTimes(1);
		expect(createdUser).toEqual(userRequest);
	});
});
