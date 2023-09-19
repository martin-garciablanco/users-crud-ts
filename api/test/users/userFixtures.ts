import { randomUUID } from "crypto";

import { User } from "../../src/user/domain/User";
import { UserRequest } from "../../src/user/infra/UserRequest";

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

export const createRandomUserRequest = (): UserRequest => {
	return {
		name: `jhon-${Math.random()}`,
		lastName: `Doe-${Math.random()}`,
		phoneNumber: `666666-${Math.random()}`,
		email: `jhon-${Math.random()}@mail.com`,
	};
};

export const createRandomUser = (): User => {
	return {
		id: randomUUID(),
		name: `jhon-${Math.random()}`,
		lastName: `Doe-${Math.random()}`,
		phoneNumber: `666666-${Math.random()}`,
		email: `jhon-${Math.random()}@mail.com`,
	};
};
