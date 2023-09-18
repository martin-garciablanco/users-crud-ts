import { UUID } from "crypto";

export interface User {
	id: UUID;
	name: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}
