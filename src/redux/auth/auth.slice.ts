import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth.api";
import type { AuthUser, LoginPayload, RegisterPayload } from "../../types";

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
};

const TOKEN_KEY = "oc_token";
const USER_KEY = "oc_user";

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  initialized: false,
};

const readPersistedAuth = (): { token: string | null; user: AuthUser | null } => {
  const token = localStorage.getItem(TOKEN_KEY);
  const rawUser = localStorage.getItem(USER_KEY);

  if (!token || !rawUser) {
    return { token: null, user: null };
  }

  try {
    return { token, user: JSON.parse(rawUser) as AuthUser };
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return { token: null, user: null };
  }
};

const persistAuth = (token: string, user: AuthUser) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearPersistedAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const parseAuthPayload = (responseData: any): { token: string; user: AuthUser } => {
  const wrapped = responseData?.data;
  const payload = wrapped?.token && wrapped?.user ? wrapped : responseData;

  if (!payload?.token || !payload?.user) {
    throw new Error("Invalid authentication response from server");
  }

  return {
    token: String(payload.token),
    user: payload.user as AuthUser,
  };
};

const parseCurrentUser = (responseData: any): AuthUser => {
  const payload = responseData?.data ?? responseData;
  if (!payload?._id) {
    throw new Error("Invalid user response from server");
  }
  return payload as AuthUser;
};

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    const { token, user } = readPersistedAuth();

    if (!token || !user) {
      return { token: null, user: null };
    }

    try {
      const meRes = await authApi.me();
      const freshUser = parseCurrentUser(meRes.data);
      persistAuth(token, freshUser);
      return { token, user: freshUser };
    } catch {
      clearPersistedAuth();
      return rejectWithValue("Session expired. Please login again.");
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);
      const data = parseAuthPayload(res.data);
      persistAuth(data.token, data.user);
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const res = await authApi.register(payload);
      const data = parseAuthPayload(res.data);
      persistAuth(data.token, data.user);
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    logoutAuth: (state) => {
      clearPersistedAuth();
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      state.initialized = true;
    },
    setAuthFromStorage: (
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
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
        state.token = null;
        state.user = null;
        state.error = (action.payload as string) || null;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Login failed.";
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Registration failed.";
      });
  },
});

export const { clearAuthError, logoutAuth, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
