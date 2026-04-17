import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminApi } from '@/api/admin.api';
import type { AdminUser } from '@/types';
import {
	clearAdminStorage,
	readAdminStorage,
	writeAdminStorage,
} from '@/redux/helper/storage';
import { extractAdminPayload } from '@/redux/helper/payload';

type AdminState = {
	admin: AdminUser | null;
	token: string | null;
	loading: boolean;
	error: string | null;
	initialized: boolean;
};

const initialState: AdminState = {
	admin: null,
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

export const initializeAdminAuth = createAsyncThunk('admin/initializeAdminAuth', async () => {
	const { token, admin } = readAdminStorage();
	if (!token || !admin) {
		return { token: null as string | null, admin: null as AdminUser | null };
	}
	return { token, admin };
});

export const loginAdmin = createAsyncThunk(
	'admin/loginAdmin',
	async (
		payload: { email: string; password: string; adminSecret: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await adminApi.login(
				payload.email,
				payload.password,
				payload.adminSecret,
			);
			const parsed = extractAdminPayload(response.data);
			writeAdminStorage(parsed.token, parsed.admin);
			return parsed;
		} catch (error: unknown) {
			return rejectWithValue(getErrorMessage(error, 'Admin login failed.'));
		}
	},
);

export const logoutAdmin = createAsyncThunk('admin/logoutAdmin', async () => {
	clearAdminStorage();
});

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		clearAdminError: (state) => {
			state.error = null;
		},
		forceAdminLogout: (state) => {
			clearAdminStorage();
			state.admin = null;
			state.token = null;
			state.loading = false;
			state.error = null;
			state.initialized = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(initializeAdminAuth.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(initializeAdminAuth.fulfilled, (state, action) => {
				state.loading = false;
				state.initialized = true;
				state.token = action.payload.token;
				state.admin = action.payload.admin;
			})
			.addCase(initializeAdminAuth.rejected, (state) => {
				state.loading = false;
				state.initialized = true;
				state.admin = null;
				state.token = null;
			})
			.addCase(loginAdmin.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginAdmin.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.token = action.payload.token;
				state.admin = action.payload.admin;
			})
			.addCase(loginAdmin.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) ?? 'Admin login failed.';
			})
			.addCase(logoutAdmin.fulfilled, (state) => {
				state.admin = null;
				state.token = null;
				state.loading = false;
				state.error = null;
				state.initialized = true;
			});
	},
});

export const { clearAdminError, forceAdminLogout } = adminSlice.actions;
export default adminSlice.reducer;
