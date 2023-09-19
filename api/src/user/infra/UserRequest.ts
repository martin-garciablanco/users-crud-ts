import { User } from "../domain/User";

export interface UserRequest {
	name: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}

export class UserRequestFactory {
	static create({
		name,
		lastName,
		phoneNumber,
		email,
	}: {
		name: string;
		lastName: string;
		phoneNumber: string;
		email: string;
	}): UserRequest {
		return { name, lastName, phoneNumber, email };
	}

	static createFromUser({ name, lastName, phoneNumber, email }: User): UserRequest {
		return { name, lastName, phoneNumber, email };
	}
}
