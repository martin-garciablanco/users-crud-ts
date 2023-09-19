import { randomUUID } from "crypto";

import { UserRequest } from "../../src/users/infra/UserRequest";

export const userStub = {
	id: randomUUID(),
	name: "John",
	lastName: "Don",
	email: "john.doe@mail.com",
	phoneNumber: "+00666666666",
};

export const userRequestStub: UserRequest = {
	name: "John",
	lastName: "Doe",
	email: "john.doe@mail.com",
	phoneNumber: "+00666666666",
};
