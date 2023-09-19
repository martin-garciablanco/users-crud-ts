import { Optional } from "typescript-optional";

import { User } from "./User";

export interface UserRepository {
	users: Map<string, User>; // Created public temporary field for testing porpouses
	create(user: User): Optional<User>;
	getAll(): Array<User>;
	getByEmail(email: string): Optional<User>;
	deleteByEmail(email: string): Optional<string>;
}
