export const AUTH_TOKEN_KEY = 'oc_token';
export const AUTH_USER_KEY = 'oc_user';
export const ADMIN_TOKEN_KEY = 'oc_admin_token';
export const ADMIN_USER_KEY = 'oc_admin_user';

export const getStoredToken = (key: string): string | null => {
	return localStorage.getItem(key);
};

export const setStoredToken = (key: string, token: string): void => {
	localStorage.setItem(key, token);
};

export const removeStoredToken = (key: string): void => {
	localStorage.removeItem(key);
};

