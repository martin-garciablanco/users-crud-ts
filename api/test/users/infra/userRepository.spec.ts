import { User } from "../../../src/users/domain/User";
import { UserInMemoryRepository } from "../../../src/users/infra/UserInMemoryRepository";
import { userStub } from "../userFixtures";

describe("UserRepository", () => {
	it("should be empty at the beginning", () => {
		const userRepository = UserInMemoryRepository.initialize();
		expect(userRepository.users.size).toEqual(0);
	});

	it("should have the user after create it", () => {
		const userRepository = UserInMemoryRepository.initialize();
		const user: User = userStub;
		const createdUser = userRepository.create(user).get();
		expect(userRepository.users.get(user.email)).toEqual(createdUser);
		expect(userRepository.users.size).toEqual(1);
	});
});
