import type {
  AdminAuthPayload,
  AdminUser,
  ApiEnvelope,
  AuthPayload,
  AuthResponse,
  AuthUser,
} from '@/types';


const asObject = (value: unknown): Record<string, unknown> | null => {
  if (typeof value !== 'object' || value === null) return null;
  return value as Record<string, unknown>;
};




export const extractAuthPayload = (raw: unknown): AuthPayload => {
  const wrapped = raw as ApiEnvelope<AuthPayload | AuthResponse>;
  const payload = wrapped?.data ?? raw;
  const obj = asObject(payload);

  const token = typeof obj?.token === 'string' ? obj.token : null;
  const user = asObject(obj?.user) as AuthUser | null;

  if (!token || !user) {
    throw new Error('Invalid authentication response from server');
  }

  return { token, user };
};



export const extractAdminPayload = (raw: unknown): AdminAuthPayload => {
    const wrapped = raw as ApiEnvelope<AdminAuthPayload | { token: string; user: AdminUser }>;
    const payload = wrapped?.data ?? raw;
    const obj = asObject(payload);

    const token = typeof obj?.token === 'string' ? obj.token : null;
    const admin = (asObject(obj?.admin) ?? asObject(obj?.user)) as AdminUser | null;

    if (!token || !admin) {
        throw new Error('Invalid admin authentication response from server');
    }

    return { token, admin };
};


export const extractAuthUser = (raw: unknown): AuthUser => {
  const wrapped = raw as ApiEnvelope<AuthUser>;
  const payload = wrapped?.data ?? raw;
  const user = asObject(payload) as AuthUser | null;

  if (!user?._id) {
    throw new Error('Invalid user response from server');
  }

  return user;
};
