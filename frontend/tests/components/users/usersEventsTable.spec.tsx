import { render, screen } from "@testing-library/react";

import { UserEventsTable } from "../../../src/components/user/UserEventsTable/UserEventsTable";
import { Event } from "../../../src/domain/Event";

const event: Event = {
	message: "This is a message",
	time: new Date(),
	type: "CREATE",
};

describe("UserEventsTable component", () => {
	it("should show titles and data", async () => {
		render(<UserEventsTable events={[event]} />);

		const timeTitle = await screen.findByText("Time");
		const timeData = await screen.findByText(String(event.time));
		const typeTitle = await screen.findByText("Type");
		const typeData = await screen.findByText(event.type);
		const messageTitle = await screen.findByText("Message");
		const messageData = await screen.findByText(event.message);

		expect(timeTitle).toBeInTheDocument();
		expect(timeData).toBeInTheDocument();
		expect(typeTitle).toBeInTheDocument();
		expect(typeData).toBeInTheDocument();
		expect(messageTitle).toBeInTheDocument();
		expect(messageData).toBeInTheDocument();
	});
});
