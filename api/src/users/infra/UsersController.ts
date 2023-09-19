import { Application, Request, Response } from "express";

import { UserService } from "../application/UserService";
import { UserRequest } from "./UserRequest";

export const usersEndpoint = (app: Application): void => {
	app.get("/users", (req: Request, res: Response) => {
		return res.status(200).send("You're seeing our users");
	});

	app.post("/users", (req: Request, res: Response) => {
		const userService = new UserService();
		const createdUserRequest = userService.createUser(req.body as UserRequest);

		return res.status(201).send(createdUserRequest);
	});
};
