import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '@/api/auth.api';
import type { AuthUser, LoginPayload, RegisterPayload } from '@/types';
import {
	clearAuthStorage,
	readAuthStorage,
	writeAuthStorage,
} from '@/redux/helper/storage';
import { extractAuthPayload, extractAuthUser } from '@/redux/helper/payload';

type AuthState = {
	user: AuthUser | null;
	token: string | null;
	loading: boolean;
	error: string | null;
	initialized: boolean;
};

const initialState: AuthState = {
	user: null,
	token: null,
	loading: false,
	error: null,
	initialized: false,
};

const getErrorMessage = (error: unknown, fallback: string): string => {
	if (
		typeof error === 'object' &&
		error !== null &&
		'response' in error &&
		typeof (error as { response?: { data?: { message?: string } } }).response?.data
			?.message === 'string'
	) {
		return (
			(error as { response?: { data?: { message?: string } } }).response?.data?.message ??
			fallback
		);
	}
	return fallback;
};

export const initializeAuth = createAsyncThunk(
	'auth/initializeAuth',
	async (_, { rejectWithValue }) => {
		const { token, user } = readAuthStorage();

		if (!token || !user) {
			return { token: null as string | null, user: null as AuthUser | null };
		}

		try {
			const response = await authApi.me();
			const freshUser = extractAuthUser(response.data);
			writeAuthStorage(token, freshUser);
			return { token, user: freshUser };
		} catch {
			clearAuthStorage();
			return rejectWithValue('Session expired. Please login again.');
		}
	},
);

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (payload: LoginPayload, { rejectWithValue }) => {
		try {
			const response = await authApi.login(payload);
			const parsed = extractAuthPayload(response.data);
			writeAuthStorage(parsed.token, parsed.user);
			return parsed;
		} catch (error: unknown) {
			return rejectWithValue(getErrorMessage(error, 'Login failed. Please try again.'));
		}
	},
);

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (payload: RegisterPayload, { rejectWithValue }) => {
		try {
			const response = await authApi.register(payload);
			const parsed = extractAuthPayload(response.data);
			writeAuthStorage(parsed.token, parsed.user);
			return parsed;
		} catch (error: unknown) {
			return rejectWithValue(getErrorMessage(error, 'Registration failed. Please try again.'));
		}
	},
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
	try {
		await authApi.logout();
	} finally {
		clearAuthStorage();
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearAuthError: (state) => {
			state.error = null;
		},
		forceLogout: (state) => {
			clearAuthStorage();
			state.user = null;
			state.token = null;
			state.loading = false;
			state.error = null;
			state.initialized = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(initializeAuth.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(initializeAuth.fulfilled, (state, action) => {
				state.loading = false;
				state.initialized = true;
				state.token = action.payload.token;
				state.user = action.payload.user;
			})
			.addCase(initializeAuth.rejected, (state, action) => {
				state.loading = false;
				state.initialized = true;
				state.user = null;
				state.token = null;
				state.error = (action.payload as string) ?? null;
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.token = action.payload.token;
				state.user = action.payload.user;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) ?? 'Login failed. Please try again.';
			})
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.token = action.payload.token;
				state.user = action.payload.user;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) ?? 'Registration failed. Please try again.';
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.token = null;
				state.loading = false;
				state.error = null;
				state.initialized = true;
			});
	},
});

export const { clearAuthError, forceLogout } = authSlice.actions;
export default authSlice.reducer;
