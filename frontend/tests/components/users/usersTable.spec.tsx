import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UsersTable } from "../../../src/components/user/UsersTable/UsersTable";
import { User } from "../../../src/domain/User";

const user: User = {
	name: "name",
	lastName: "lastName",
	email: "name@email.com",
	phoneNumber: "666777888",
	events: [],
};
const updateCallbackMock = jest.fn();
const deleteCallbackMock = jest.fn();
const seeDetailsCallbackMock = jest.fn();

describe("UsersTable component", () => {
	it("should show titles, data", async () => {
		render(
			<UsersTable
				users={[user]}
				update={updateCallbackMock}
				remove={deleteCallbackMock}
				seeDetails={seeDetailsCallbackMock}
			/>
		);

		const emailTitle = await screen.findByText("Email");
		const emailData = await screen.findByText(user.email);
		const nameTitle = await screen.findByText("Name");
		const nameData = await screen.findByText(user.name);
		const lastNameTitle = await screen.findByText("Last name");
		const lastNameData = await screen.findByText(user.lastName);
		const phoneNumberTitle = await screen.findByText("Phone number");
		const phoneNumberData = await screen.findByText(user.phoneNumber);

		expect(emailTitle).toBeInTheDocument();
		expect(emailData).toBeInTheDocument();
		expect(nameTitle).toBeInTheDocument();
		expect(nameData).toBeInTheDocument();
		expect(lastNameTitle).toBeInTheDocument();
		expect(lastNameData).toBeInTheDocument();
		expect(phoneNumberTitle).toBeInTheDocument();
		expect(phoneNumberData).toBeInTheDocument();
	});

	it("should show update, delete and details buttons", async () => {
		render(
			<UsersTable
				users={[user]}
				update={updateCallbackMock}
				remove={deleteCallbackMock}
				seeDetails={seeDetailsCallbackMock}
			/>
		);

		const [updateButton, deleteButton, detailsButton] = await screen.findAllByRole("button");
		userEvent.click(updateButton);
		userEvent.click(deleteButton);
		userEvent.click(detailsButton);
		expect(updateCallbackMock).toHaveBeenCalledTimes(1);
		expect(deleteCallbackMock).toHaveBeenCalledTimes(1);
		expect(seeDetailsCallbackMock).toHaveBeenCalledTimes(1);

		expect(updateButton).toBeInTheDocument();
		expect(deleteButton).toBeInTheDocument();
		expect(detailsButton).toBeInTheDocument();
	});

	it("should not show details button when seeDetails not received", async () => {
		render(<UsersTable users={[user]} update={updateCallbackMock} remove={deleteCallbackMock} />);

		const buttons = await screen.findAllByRole("button");

		expect(buttons.length).toEqual(2);
	});
});
