import { User } from "./User";

export interface UserRepository {
	users: Map<string, User>; // Created public temporary field for testing porpouses
	create(user: User): User;
}
