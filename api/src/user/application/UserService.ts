import { EventService } from "../../event/application/EventService";
import { User, UserFactory } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserInMemoryRepository } from "../infra/UserInMemoryRepository";
import { UserRequest, UserRequestFactory } from "../infra/UserRequest";
import { UserAlreadyExistsError } from "./UserAlreadyExistsError";
import { UserNotFoundError } from "./UserNotFoundError";

export class UserService {
	private readonly userRepository: UserRepository;
	private readonly eventService: EventService;

	constructor() {
		this.userRepository = UserInMemoryRepository.initialize();
		this.eventService = new EventService();
	}

	createUser({ name, lastName, phoneNumber, email }: UserRequest): UserRequest {
		const user = UserFactory.create({ name, lastName, phoneNumber, email });
		const createdUser = this.userRepository.create(user);
		if (createdUser.isPresent()) {
			this.createNewUserEvent(createdUser.get());

			return { name, lastName, phoneNumber, email };
		}

		throw new UserAlreadyExistsError();
	}

	getAllUsers(): Array<UserRequest> {
		const allUsers = this.userRepository.getAll();

		return allUsers.map((user: User) => UserRequestFactory.createFromUser(user));
	}

	getUserByEmail(email: string): UserRequest {
		const userOptional = this.userRepository.getByEmail(email);

		if (userOptional.isPresent()) {
			const foundUser = userOptional.get();

			return UserRequestFactory.createFromUser(foundUser);
		}

		throw new UserNotFoundError(`email: ${email}`);
	}

	deleteUserByEmail(email: string): string {
		const userOptional = this.userRepository.deleteByEmail(email);
		if (userOptional.isPresent()) {
			return email;
		}
		throw new UserNotFoundError(`email: ${email}`);
	}

	updateUserByEmail(userRequest: UserRequest): UserRequest {
		const foundUser = this.userRepository.getByEmail(userRequest.email);
		if (foundUser.isPresent()) {
			const userToUpdate: User = {
				...foundUser.get(),
				name: userRequest.name,
				lastName: userRequest.lastName,
				phoneNumber: userRequest.phoneNumber,
			};
			const userUpdatedOptional = this.userRepository.updateByEmail(userToUpdate);
			this.createUpdatedUserEvent(foundUser.get());

			const userUpdated = userUpdatedOptional.orElseThrow(
				() => new UserNotFoundError(`email: ${userRequest.email}`),
			);

			return UserRequestFactory.createFromUser(userUpdated);
		}

		throw new UserNotFoundError(`email: ${userRequest.email}`);
	}

	private createNewUserEvent(user: User): void {
		const newUserEventMessage = "User Created";
		this.eventService.createEvent(user.id, "CREATE", newUserEventMessage);
	}

	private createUpdatedUserEvent(oldUser: User): void {
		const updatedUserEventMessage = `User updated, old user info: ${String(oldUser)}`;
		this.eventService.createEvent(oldUser.id, "UPDATE", updatedUserEventMessage);
	}
}
