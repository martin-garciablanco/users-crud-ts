import { Event } from "../../event/domain/Event";
import { User } from "../domain/User";
import { UserRequest } from "./UserRequest";

export interface UserDetailsRequest extends UserRequest {
	events: Array<Event>;
}

export class UserDetailsRequestFactory {
	static createFromUser(
		{ name, lastName, phoneNumber, email }: User,
		events: Array<Event>,
	): UserDetailsRequest {
		return { name, lastName, phoneNumber, email, events };
	}
}
