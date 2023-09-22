import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ModalConfirmation } from "../../../src/components/layout/ModalConfirmation/ModalConfirmation";

describe("ModalConfirmation component", () => {
	it("should render children, Accept and Cancel buttons", async () => {
		const acceptCallback = jest.fn();
		const cancelCallback = jest.fn();
		const children = "Text";
		render(
			<ModalConfirmation accept={acceptCallback} cancel={cancelCallback}>
				{children}
			</ModalConfirmation>
		);

		const cancelButton = await screen.findByText("Cancel");
		const acceptButton = await screen.findByText("Accept");
		userEvent.click(cancelButton);
		expect(cancelCallback).toHaveBeenCalledTimes(1);

		userEvent.click(acceptButton);
		expect(acceptCallback).toHaveBeenCalledTimes(1);

		expect(cancelButton).toBeInTheDocument();
		expect(acceptButton).toBeInTheDocument();
		expect(await screen.findByText(children)).toBeInTheDocument();
	});
});
