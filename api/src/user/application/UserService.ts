import { User, UserFactory } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserInMemoryRepository } from "../infra/UserInMemoryRepository";
import { UserRequest, UserRequestFactory } from "../infra/UserRequest";
import { UserAlreadyExistsError } from "./UserAlreadyExistsError";
import { UserNotFoundError } from "./UserNotFoundError";

export class UserService {
	private readonly userRepository: UserRepository;

	constructor() {
		this.userRepository = UserInMemoryRepository.initialize();
	}

	createUser({ name, lastName, phoneNumber, email }: UserRequest): UserRequest {
		const user = UserFactory.create({ name, lastName, phoneNumber, email });
		const createdUser = this.userRepository.create(user);
		if (createdUser.isPresent()) {
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
		const userToUpdate = this.userRepository.getByEmail(userRequest.email);
		if (userToUpdate.isPresent()) {
			const userUpdatedOptional = this.userRepository.updateByEmail(userToUpdate.get());

			const userUpdated = userUpdatedOptional.orElseThrow(
				() => new UserNotFoundError(`email: ${userRequest.email}`),
			);

			return UserRequestFactory.createFromUser(userUpdated);
		}

		throw new UserNotFoundError(`email: ${userRequest.email}`);
	}
}
