// Placeholder auth utilities
// This will be replaced with actual auth implementation when backend is integrated

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem("auth_token", token)
}

export function removeToken(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("auth_token")
}

export function getUser(): any {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("user")
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function setUser(user: any): void {
  if (typeof window === "undefined") return
  localStorage.setItem("user", JSON.stringify(user))
}

export function isAuthenticated(): boolean {
  return getToken() !== null
}

export function logout(): void {
  removeToken()
  localStorage.removeItem("user")
}

