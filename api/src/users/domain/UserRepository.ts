import { User } from "./User";

export interface UserRepository {
	users: User[]; // Created public temporary field for testing porpouses
	create(user: User): User;
}
