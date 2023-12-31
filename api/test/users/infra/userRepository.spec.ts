import { Optional } from "typescript-optional";

import { User } from "../../../src/user/domain/User";
import { UserRepository } from "../../../src/user/domain/UserRepository";
import { UserInMemoryRepository } from "../../../src/user/infra/UserInMemoryRepository";
import { createRandomUser, userStub } from "../userFixtures";

let userRepository: UserRepository;
let user: User;
describe("UserRepository", () => {
	beforeEach(() => {
		userRepository = UserInMemoryRepository.initialize();
		userRepository.users = new Map();
		user = userStub;
	});

	it("should be empty at the beginning", () => {
		expect(userRepository.users.size).toEqual(0);
	});

	describe("create", () => {
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

	describe("getAll", () => {
		it("should return an empty array when no users saved", () => {
			const allUsers = userRepository.getAll();
			expect(allUsers).toEqual([]);
		});

		it("should return an array with saved users", () => {
			const userOne = createRandomUser();
			const userTwo = createRandomUser();
			userRepository.create(userOne);
			userRepository.create(userTwo);

			const allUsers = userRepository.getAll();

			expect(allUsers.length).toEqual(2);
			expect(allUsers.includes(userOne)).toBeTruthy();
			expect(allUsers.includes(userTwo)).toBeTruthy();
		});
	});
	describe("getByEmail", () => {
		it("should return an empty optional if user not found", () => {
			const wrongEmail = "wrong@mail.com";
			const user = userRepository.getByEmail(wrongEmail);
			expect(user).toEqual(Optional.empty());
		});

		it("should find an user given a proper email", () => {
			const user = createRandomUser();
			userRepository.create(user);

			const foundUser = userRepository.getByEmail(user.email).get();

			expect(foundUser).toEqual(user);
		});
	});
	describe("deleteByEmail", () => {
		it("should return an empty optional if user not found", () => {
			const wrongEmail = "wrong@mail.com";
			const user = userRepository.deleteByEmail(wrongEmail);
			expect(user).toEqual(Optional.empty());
		});

		it("should return the email of the deleted user", () => {
			const user = createRandomUser();
			userRepository.create(user);

			const deletedUserEmail = userRepository.deleteByEmail(user.email).get();

			expect(deletedUserEmail).toEqual(user.email);
			expect(userRepository.getAll().length).toEqual(0);
		});
	});

	describe("updateByEmail", () => {
		it("should return an empty optional if user not found", () => {
			const userToUpdate = createRandomUser();
			const user = userRepository.updateByEmail(userToUpdate);
			expect(user).toEqual(Optional.empty());
		});

		it("should return the updated user", () => {
			const user = createRandomUser();
			userRepository.create(user);
			expect(userRepository.getAll().length).toEqual(1);
			const userToUpdate = { ...user, name: "updatedName" };

			const updatedUser = userRepository.updateByEmail(userToUpdate).get();

			expect(userRepository.getAll().length).toEqual(1);
			expect(updatedUser).toEqual(userToUpdate);
		});
	});
});
