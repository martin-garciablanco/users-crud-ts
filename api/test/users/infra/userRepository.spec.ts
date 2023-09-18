import { randomUUID } from "crypto";

import { User } from "../../../src/users/domain/User";
import { UserInMemoryRepository } from "../../../src/users/infra/UserInMemoryRepository";

describe("UserRepository", () => {
	it("should be empty at the beginning", () => {
		const userRepository = UserInMemoryRepository.initialize();
		expect(userRepository.users.length).toEqual(0);
	});

	it("should have the user after create it", () => {
		const userRepository = UserInMemoryRepository.initialize();
		const user: User = {
			id: randomUUID(),
			name: "John",
			lastName: "Don",
			email: "john.doe@mail.com",
			phoneNumber: "+00666666666",
		};
		userRepository.create(user);
		expect(userRepository.users.length).toEqual(1);
	});
});
