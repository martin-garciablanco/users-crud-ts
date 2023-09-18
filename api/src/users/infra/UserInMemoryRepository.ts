import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserInMemoryRepository implements UserRepository {
	users: User[];

	constructor(users: User[] = []) {
		this.users = users;
	}

	create(user: User): User {
		this.users.push(user);

		return user;
	}
}
