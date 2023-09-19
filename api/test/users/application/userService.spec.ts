import { randomUUID } from "crypto";
import { Optional } from "typescript-optional";

import { UserService } from "../../../src/users/application/UserService";
import { UserFactory } from "../../../src/users/domain/UserFactory";
import { UserInMemoryRepository } from "../../../src/users/infra/UserInMemoryRepository";
import { UserRequest } from "../../../src/users/infra/UserRequest";

describe("UserService", () => {
	it("should create an user", () => {
		const user: UserRequest = {
			name: "John",
			lastName: "Doe",
			email: "john.doe@mail.com",
			phoneNumber: "+00666666666",
		};
		const userCreatedStub = {
			id: randomUUID(),
			name: user.name,
			lastName: user.lastName,
			email: user.email,
			phoneNumber: user.phoneNumber,
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

		const createdUser = userService.createUser(user);

		expect(repositoryCreateMock).toHaveBeenCalledTimes(1);
		expect(factoryCreateMock).toHaveBeenCalledTimes(1);
		expect(userCreatedStub).toEqual(createdUser);
	});
});
