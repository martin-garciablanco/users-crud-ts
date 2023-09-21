import { config } from "../config";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserRestFullRepository implements UserRepository {
	readonly url: string;

	constructor() {
		this.url = `${config.baseUrl}/users`;
	}

	async getAllUsers(): Promise<Array<User>> {
		const response = await fetch(this.url);

		return (await response.json()) as Array<User>;
	}

	async getUserByEmail(email: string): Promise<User> {
		const response = await fetch(`${this.url}/${email}`);

		return (await response.json()) as User;
	}

	async createUser(user: User): Promise<void> {
		await fetch(this.url, {
			method: "POST",
			body: JSON.stringify(user),
			headers: { "Content-Type": "application/json" },
		});
	}

	async updateUser(user: User): Promise<User> {
		const response = await fetch(`${this.url}/${user.email}`, {
			method: "PUT",
			body: JSON.stringify(user),
			headers: { "Content-Type": "application/json" },
		});

		return (await response.json()) as User;
	}

	async removeUser(user: User): Promise<void> {
		await fetch(`${this.url}/${user.email}`, {
			method: "DELETE",
		});
	}
}
