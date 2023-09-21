import {
	createAsyncThunk,
	createSlice,
	CreateSliceOptions,
	PayloadAction,
	SliceCaseReducers,
} from "@reduxjs/toolkit";

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
	await fetch("http://localhost:3003/users", {
		method: "POST",
		body: JSON.stringify(user),
		headers: { "Content-Type": "application/json" },
	});
});

export const updateUser = createAsyncThunk("UpdateUser", async (user: User): Promise<User> => {
	const response = await fetch(`http://localhost:3003/users/${user.email}`, {
		method: "PUT",
		body: JSON.stringify(user),
		headers: { "Content-Type": "application/json" },
	});
	const userUpdated = await response.json();

	return userUpdated;
});

export const removeUser = createAsyncThunk("RemoveUser", async (user: User): Promise<void> => {
	await fetch(`http://localhost:3003/users/${user.email}`, {
		method: "DELETE",
	});
});

export const getUserDetails = createAsyncThunk(
	"GetUserDetails",
	async (email: string): Promise<User> => {
		const response = await fetch(`http://localhost:3003/users/${email}`);

		return await response.json();
	}
);

export const getAllUsers = createAsyncThunk("GetAllUsers", async (): Promise<Array<User>> => {
	const response = await fetch("http://localhost:3003/users");
	const users = response.json();

	return users;
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
