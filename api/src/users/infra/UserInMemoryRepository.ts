import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

class UserInMemoryRepositoryImpl implements UserRepository {
	users: User[];

	constructor(users: User[] = []) {
		this.users = users;
	}

	create(user: User): User {
		this.users.push(user);

		return user;
	}
}

export class UserInMemoryRepository {
	private static repository: UserRepository | undefined;

	static initialize(users: User[] = []): UserRepository {
		if (this.repository) {
			return this.repository;
		}
		this.repository = new UserInMemoryRepositoryImpl(users);

		return this.repository;
	}
}
