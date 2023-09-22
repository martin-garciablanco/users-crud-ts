import { EventDTO } from "../../event/application/EventDTO";
import { User } from "../domain/User";

export interface UserDTO {
	name: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	events: Array<EventDTO>;
}

export class UserDTOFactory {
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
		events: Array<EventDTO>;
	}): UserDTO {
		return { name, lastName, phoneNumber, email, events };
	}

	static createFromUser(
		{ name, lastName, phoneNumber, email }: User,
		events: Array<EventDTO> = [],
	): UserDTO {
		return { name, lastName, phoneNumber, email, events };
	}
}
