import { User, UserFactory } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserInMemoryRepository } from "../infra/UserInMemoryRepository";
import { UserRequest, UserRequestFactory } from "../infra/UserRequest";
import { UserAlreadyExistsError } from "./UserAlreadyExistsError";

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

		return allUsers.map(({ name, lastName, email, phoneNumber }: User) =>
			UserRequestFactory.create({ name, lastName, email, phoneNumber }),
		);
	}
}
