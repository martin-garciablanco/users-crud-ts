import { Application, Request, Response } from "express";

import { UserAlreadyExistsError } from "../application/UserAlreadyExistsError";
import { UserDTO } from "../application/UserDTO";
import { UserNotFoundError } from "../application/UserNotFoundError";
import { UserService } from "../application/UserService";

export const userEndpoints = (app: Application): void => {
	app.post("/users", (req: Request, res: Response) => {
		try {
			const userService = new UserService();
			const createdUserDTO = userService.createUser(req.body as UserDTO);

			return res.status(201).send(createdUserDTO);
		} catch (error: unknown) {
			const userAlreadyExistsError = new UserAlreadyExistsError();
			if (error instanceof Error && error.message === userAlreadyExistsError.message) {
				return res.status(400).send(userAlreadyExistsError.message);
			}

			return res.status(500);
		}
	});

	app.get("/users/:email", (req: Request, res: Response) => {
		try {
			const { email } = req.params;
			if (!email) {
				throw new UserNotFoundError("email required");
			}

			const userService = new UserService();
			const user = userService.getUserByEmail(email);

			return res.status(200).send(user);
		} catch (error: unknown) {
			const userNotFoundError = new UserNotFoundError();

			if (error instanceof Error && error.message.includes(userNotFoundError.message)) {
				return res.status(404).send(error.message);
			}

			return res.status(500);
		}
	});

	app.get("/users", (req: Request, res: Response) => {
		try {
			const userService = new UserService();
			const users = userService.getAllUsers();

			return res.status(200).send(users);
		} catch (error: unknown) {
			return res.status(500);
		}
	});

	app.delete("/users/:email", (req: Request, res: Response) => {
		try {
			const { email } = req.params;
			if (!email) {
				throw new UserNotFoundError("email required");
			}

			const userService = new UserService();
			userService.deleteUserByEmail(email);

			return res.status(200).send();
		} catch (error: unknown) {
			const userNotFoundError = new UserNotFoundError();

			if (error instanceof Error && error.message.includes(userNotFoundError.message)) {
				return res.status(404).send(error.message);
			}

			return res.status(500);
		}
	});

	app.put("/users/:email", (req: Request, res: Response) => {
		try {
			const { email } = req.params;
			if (!email) {
				throw new UserNotFoundError("email required");
			}

			const userService = new UserService();
			const updatedUserDTO = userService.updateUserByEmail(req.body as UserDTO);

			return res.status(200).send(updatedUserDTO);
		} catch (error: unknown) {
			const userNotFoundError = new UserNotFoundError();

			if (error instanceof Error && error.message.includes(userNotFoundError.message)) {
				return res.status(404).send(error.message);
			}

			return res.status(500);
		}
	});
};
