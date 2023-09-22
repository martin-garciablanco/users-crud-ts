import { Event } from "../../event/domain/Event";
import { User } from "../domain/User";

export interface UserRequest {
	name: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	events: Array<Event>;
}

export class UserRequestFactory {
	static create({
		name,
		lastName,
		phoneNumber,
		email,
		events = [],
	}: {
		name: string;
		lastName: string;
		phoneNumber: string;
		email: string;
		events: Array<Event>;
	}): UserRequest {
		return { name, lastName, phoneNumber, email, events };
	}

	static createFromUser(
		{ name, lastName, phoneNumber, email }: User,
		events: Array<Event> = [],
	): UserRequest {
		return { name, lastName, phoneNumber, email, events };
	}
}
