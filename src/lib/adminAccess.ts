import type { UserData } from '@/hooks/useAuth';

type RoleishUserData = Partial<UserData> & {
  role?: unknown;
  roles?: unknown;
  admin?: unknown;
};

export function hasAdminRole(userData: RoleishUserData | null | undefined): boolean {
  if (!userData) return false;
  if (userData.admin === true) return true;

  const role =
    typeof userData.role === 'string' ? userData.role.trim().toLowerCase() : '';
  if (role === 'admin') return true;

  if (Array.isArray(userData.roles)) {
    return userData.roles.some(
      (r) => typeof r === 'string' && r.trim().toLowerCase() === 'admin'
    );
  }

  return false;
}

