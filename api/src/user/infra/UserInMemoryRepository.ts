import { Optional } from "typescript-optional";

import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

class UserInMemoryRepositoryImpl implements UserRepository {
	users: Map<string, User>;

	constructor(users: Map<string, User> = new Map()) {
		this.users = users;
	}

	create(user: User): Optional<User> {
		if (!this.users.get(user.email)) {
			this.users.set(user.email, user);

			return Optional.of(user);
		}

		return Optional.empty();
	}

	getAll(): Array<User> {
		return Array.from(this.users.values());
	}
}

export class UserInMemoryRepository {
	private static repository: UserRepository | undefined;

	static initialize(users: Map<string, User> = new Map()): UserRepository {
		if (this.repository) {
			return this.repository;
		}
		this.repository = new UserInMemoryRepositoryImpl(users);

		return this.repository;
	}
}
