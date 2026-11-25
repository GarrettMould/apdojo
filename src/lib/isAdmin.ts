/** Whether a `users` document marks its account as a site admin (`admin: true`, or the role "admin"). */
export function isAdminUserData(data: { admin?: unknown; role?: unknown; roles?: unknown } | null | undefined): boolean {
  if (!data) return false;
  if (data.admin === true) return true;
  if (typeof data.role === 'string' && data.role.toLowerCase() === 'admin') return true;
  return Array.isArray(data.roles) && data.roles.some((r) => typeof r === 'string' && r.toLowerCase() === 'admin');
}
