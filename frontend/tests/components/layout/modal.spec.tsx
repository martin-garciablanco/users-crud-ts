import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Modal } from "../../../src/components/layout/Modal/Modal";

const closeCallback = jest.fn();
const children = "Text";

describe("Modal component", () => {
	it("should not render the modal when show prop if false", async () => {
		render(
			<Modal show={false} onClose={closeCallback}>
				{children}
			</Modal>
		);
		expect(screen.queryByText(children)).toBeNull();
	});
	it("should render close button and children", async () => {
		render(
			<Modal show onClose={closeCallback}>
				{children}
			</Modal>
		);

		const button = await screen.findByRole("button");
		userEvent.click(button);

		expect(button).toBeInTheDocument();
		expect(await screen.findByText(children)).toBeInTheDocument();
		expect(closeCallback).toHaveBeenCalledTimes(1);
	});
});
