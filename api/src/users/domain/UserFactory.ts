import { randomUUID } from "crypto";

import { User } from "./User";

export class UserFactory {
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
	}): User {
		return { id: randomUUID(), name, lastName, phoneNumber, email };
	}
}
