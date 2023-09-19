import { randomUUID, UUID } from "crypto";

export interface User {
	id: UUID;
	name: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}

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
