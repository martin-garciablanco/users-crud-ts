import { EventService } from "../../event/application/EventService";
import { User, UserFactory } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserInMemoryRepository } from "../infra/UserInMemoryRepository";
import { UserAlreadyExistsError } from "./UserAlreadyExistsError";
import { UserDTO, UserDTOFactory } from "./UserDTO";
import { UserNotFoundError } from "./UserNotFoundError";

export class UserService {
	private readonly userRepository: UserRepository;
	private readonly eventService: EventService;

	constructor() {
		this.userRepository = UserInMemoryRepository.initialize();
		this.eventService = new EventService();
	}

	createUser({ name, lastName, phoneNumber, email }: UserDTO): UserDTO {
		const user = UserFactory.create({ name, lastName, phoneNumber, email });
		const createdUser = this.userRepository.create(user);
		if (createdUser.isPresent()) {
			this.createNewUserEvent(createdUser.get());
			const events = this.eventService.getEventsByUserId(createdUser.get().id);

			return { name, lastName, phoneNumber, email, events };
		}

		throw new UserAlreadyExistsError();
	}

	getAllUsers(): Array<UserDTO> {
		const allUsers = this.userRepository.getAll();

		return allUsers.map((user: User) => {
			const events = this.eventService.getEventsByUserId(user.id);

			return UserDTOFactory.createFromUser(user, events);
		});
	}

	getUserByEmail(email: string): UserDTO {
		const userOptional = this.userRepository.getByEmail(email);

		if (userOptional.isPresent()) {
			const foundUser = userOptional.get();
			const events = this.eventService.getEventsByUserId(foundUser.id);

			return UserDTOFactory.createFromUser(foundUser, events);
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

	updateUserByEmail(userDTO: UserDTO): UserDTO {
		const foundUser = this.userRepository.getByEmail(userDTO.email);
		if (foundUser.isPresent()) {
			const userToUpdate: User = {
				...foundUser.get(),
				name: userDTO.name,
				lastName: userDTO.lastName,
				phoneNumber: userDTO.phoneNumber,
			};
			const userUpdatedOptional = this.userRepository.updateByEmail(userToUpdate);
			const userUpdated = userUpdatedOptional.orElseThrow(
				() => new UserNotFoundError(`email: ${userDTO.email}`),
			);
			this.createUpdatedUserEvent(foundUser.get());
			const events = this.eventService.getEventsByUserId(userUpdated.id);

			return UserDTOFactory.createFromUser(userUpdated, events);
		}

		throw new UserNotFoundError(`email: ${userDTO.email}`);
	}

	private createNewUserEvent(user: User): void {
		const newUserEventMessage = "User Created";
		this.eventService.createEvent(user.id, "CREATE", newUserEventMessage);
	}

	private createUpdatedUserEvent(oldUser: User): void {
		const updatedUserEventMessage = `User updated, old user info: ${JSON.stringify(oldUser)}`;
		this.eventService.createEvent(oldUser.id, "UPDATE", updatedUserEventMessage);
	}
}
