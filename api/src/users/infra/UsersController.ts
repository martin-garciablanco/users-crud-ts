import { Application, Request, Response } from "express";

import { UserAlreadyExistsError } from "../application/UserAlreadyExistsError";
import { UserService } from "../application/UserService";
import { UserRequest } from "./UserRequest";

export const usersEndpoint = (app: Application): void => {
	app.get("/users", (req: Request, res: Response) => {
		return res.status(200).send("You're seeing our users");
	});

	app.post("/users", (req: Request, res: Response) => {
		try {
			const userService = new UserService();
			const createdUserRequest = userService.createUser(req.body as UserRequest);

			return res.status(201).send(createdUserRequest);
		} catch (error: unknown) {
			const userAlreadyExistsError = new UserAlreadyExistsError();
			if (error instanceof Error && error.message === userAlreadyExistsError.message) {
				return res.status(400).send(userAlreadyExistsError.message);
			}

			return res.status(500);
		}
	});
};
