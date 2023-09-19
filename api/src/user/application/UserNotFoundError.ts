export class UserNotFoundError extends Error {
	constructor(message: string = "") {
		message ? super(`User not found ${message}`) : super(`User not found`);
	}
}
