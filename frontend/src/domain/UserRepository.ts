import { User } from "../domain/User";

export interface UserRepository {
	readonly url: string;

	getAllUsers(): Promise<Array<User>>;
	getUserByEmail(email: string): Promise<User>;
	createUser(user: User): Promise<void>;
	updateUser(user: User): Promise<User>;
	removeUser(user: User): Promise<void>;
}
