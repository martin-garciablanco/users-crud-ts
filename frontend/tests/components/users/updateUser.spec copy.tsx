import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UpdateUser } from "../../../src/components/user/UpdateUser/UpdateUser";
import { User } from "../../../src/domain/User";

const setUserMock = jest.fn();
const cancelCallbackMock = jest.fn();
const updateCallbackMock = jest.fn();
const user: User = {
	name: "name",
	lastName: "lastName",
	email: "name@email.com",
	phoneNumber: "666777888",
	events: [],
};

describe("UpdateUser component", () => {
	it("should show update, cancel buttons and userTemplate component", async () => {
		render(
			<UpdateUser
				cancel={cancelCallbackMock}
				update={updateCallbackMock}
				userToUpdate={user}
				setUserToTupdate={setUserMock}
			></UpdateUser>
		);
		const updateButton = await screen.findByText("Update");
		userEvent.click(updateButton);
		expect(updateCallbackMock).toHaveBeenCalledTimes(1);

		const cancelButton = await screen.findByText("Cancel");
		userEvent.click(cancelButton);
		expect(cancelCallbackMock).toHaveBeenCalledTimes(1);

		expect(updateButton).toBeInTheDocument();
		expect(cancelButton).toBeInTheDocument();
		expect(screen.getByTestId("user-template")).toBeInTheDocument();
	});
});
