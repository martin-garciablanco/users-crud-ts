import { User } from "../../../src/users/domain/User";
import { UserRepository } from "../../../src/users/domain/UserRepository";
import { UserInMemoryRepository } from "../../../src/users/infra/UserInMemoryRepository";
import { userStub } from "../userFixtures";

let userRepository: UserRepository;
let user: User;
describe("UserRepository", () => {
	beforeEach(() => {
		userRepository = UserInMemoryRepository.initialize();
		user = userStub;
	});
	it("should be empty at the beginning", () => {
		expect(userRepository.users.size).toEqual(0);
	});

	it("should have the user after create it", () => {
		const createdUser = userRepository.create(user).get();
		expect(userRepository.users.get(user.email)).toEqual(createdUser);
		expect(userRepository.users.size).toEqual(1);
	});

	it("should not return the user if already exists", () => {
		userRepository.create(user);
		const secondCreatedUser = userRepository.create(user);

		expect(secondCreatedUser.isPresent()).toBeFalsy();
		expect(userRepository.users.size).toEqual(1);
	});
});
