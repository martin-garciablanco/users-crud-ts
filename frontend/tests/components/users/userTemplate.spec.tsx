import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserTemplate } from "../../../src/components/user/UserTemplate/UserTemplate";
import { User } from "../../../src/domain/User";

const setUserMock = jest.fn();
const user: User = {
	name: "name",
	lastName: "lastName",
	email: "name@email.com",
	phoneNumber: "666777888",
	events: [],
};

describe("UserTemplate component", () => {
	it("should show name, lastName, phontNumber and email field", () => {
		render(<UserTemplate emailDisabled={true} setUser={setUserMock} user={user}></UserTemplate>);
		const emailInput = screen.getByDisplayValue(user.email);
		expect(emailInput).toHaveAttribute("disabled");
	});

	it("should show email field disable given emailDisabled prop", () => {
		render(<UserTemplate emailDisabled={false} setUser={setUserMock} user={user}></UserTemplate>);

		expect(screen.getByDisplayValue(user.email)).toBeInTheDocument();
		expect(screen.getByDisplayValue(user.lastName)).toBeInTheDocument();
		expect(screen.getByDisplayValue(user.name)).toBeInTheDocument();
		expect(screen.getByDisplayValue(user.phoneNumber)).toBeInTheDocument();
	});

	it("should update the given user on writting in an input", () => {
		render(<UserTemplate emailDisabled={false} setUser={setUserMock} user={user}></UserTemplate>);
		const newLastNameValue = "n";
		userEvent.type(screen.getByDisplayValue(user.lastName), newLastNameValue);

		const expectedUpdatedUser: User = { ...user, lastName: user.lastName + newLastNameValue };

		expect(setUserMock).toHaveBeenCalledWith(expectedUpdatedUser);
	});
});
