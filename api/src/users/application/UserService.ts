import { UserFactory } from "../domain/UserFactory";
import { UserRepository } from "../domain/UserRepository";
import { UserInMemoryRepository } from "../infra/UserInMemoryRepository";
import { UserRequest } from "../infra/UserRequest";

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
		throw new Error("User already exists");
	}
}
