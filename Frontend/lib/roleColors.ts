import { UserRole } from "@/types/user"

export interface RoleColors {
  primary: string
  primaryForeground: string
  sidebarBg: string
  headerBg: string
}

export const roleColorPalettes: Record<UserRole, RoleColors> = {
  [UserRole.CLIENT]: {
    primary: "#3b82f6", // Blue
    primaryForeground: "#ffffff",
    sidebarBg: "#1e40af", // Dark blue
    headerBg: "#ffffff",
  },
  [UserRole.ADMIN]: {
    primary: "#8b5cf6", // Purple
    primaryForeground: "#ffffff",
    sidebarBg: "#6d28d9", // Dark purple
    headerBg: "#ffffff",
  },
  [UserRole.SUPERADMIN]: {
    primary: "#ef4444", // Red
    primaryForeground: "#ffffff",
    sidebarBg: "#dc2626", // Dark red
    headerBg: "#ffffff",
  },
  [UserRole.AGENT]: {
    primary: "#10b981", // Green
    primaryForeground: "#ffffff",
    sidebarBg: "#059669", // Dark green
    headerBg: "#ffffff",
  },
  [UserRole.ORG_ADMIN]: {
    primary: "#8faa76", // Original green (default)
    primaryForeground: "#ffffff",
    sidebarBg: "#6b8e4f", // Dark green
    headerBg: "#ffffff",
  },
}

export function getRoleColors(role: string): RoleColors {
  return roleColorPalettes[role as UserRole] || roleColorPalettes[UserRole.ORG_ADMIN]
}

export function getRoleDisplayName(role: string): string {
  const roleMap: Record<string, string> = {
    [UserRole.CLIENT]: "Client Dashboard",
    [UserRole.ADMIN]: "Admin Dashboard",
    [UserRole.SUPERADMIN]: "Super Admin Dashboard",
    [UserRole.AGENT]: "Agent Dashboard",
    [UserRole.ORG_ADMIN]: "Org Admin Dashboard",
  }
  return roleMap[role] || "Dashboard"
}

