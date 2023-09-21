import {
	createAsyncThunk,
	createSlice,
	CreateSliceOptions,
	PayloadAction,
	SliceCaseReducers,
} from "@reduxjs/toolkit";

import { UserRestFullRepository } from "../../api/UserRestFullRepository";
import { User } from "../../domain/User";

interface UsersState {
	users: Array<User>;
	userDetails: User;
	title: string;
}

const initialState: UsersState = {
	users: [],
	userDetails: {} as User,
	title: "",
};

export const createUser = createAsyncThunk("CreateUser", async (user: User): Promise<void> => {
	const userRepository = new UserRestFullRepository();

	return userRepository.createUser(user);
});

export const updateUser = createAsyncThunk("UpdateUser", async (user: User): Promise<User> => {
	const userRepository = new UserRestFullRepository();

	return userRepository.updateUser(user);
});

export const removeUser = createAsyncThunk("RemoveUser", async (user: User): Promise<void> => {
	const userRepository = new UserRestFullRepository();

	return userRepository.removeUser(user);
});

export const getUserDetails = createAsyncThunk(
	"GetUserDetails",
	async (email: string): Promise<User> => {
		const userRepository = new UserRestFullRepository();

		return userRepository.getUserByEmail(email);
	}
);

export const getAllUsers = createAsyncThunk("GetAllUsers", async (): Promise<Array<User>> => {
	const userRepository = new UserRestFullRepository();

	return userRepository.getAllUsers();
});

const reducerOptions: CreateSliceOptions<UsersState, SliceCaseReducers<UsersState>, string> = {
	name: "users",
	initialState,
	reducers: {
		setUserDetails: (state, action: PayloadAction<User>) => {
			state.userDetails = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllUsers.fulfilled, (state, action) => {
			state.users = action.payload;
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.userDetails = action.payload;
		});
		builder.addCase(getUserDetails.fulfilled, (state, action) => {
			state.userDetails = action.payload;
		});
	},
};

export const userSlice = createSlice(reducerOptions);
export const { setUserDetails } = userSlice.actions;
export default userSlice;
