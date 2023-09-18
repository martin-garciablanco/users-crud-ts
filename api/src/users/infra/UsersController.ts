import { Application, Request, Response } from "express";

export const usersEndpoint = (app: Application): void => {
	app.get("/users", (req: Request, res: Response) => {
		return res.status(200).send("You're seeing our users");
	});
};
