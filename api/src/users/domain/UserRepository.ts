import { User } from "./User";

export interface UserRepository {
	create(user: User): User;
}
