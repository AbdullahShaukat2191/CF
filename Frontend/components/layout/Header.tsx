"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { getUser } from "@/lib/auth"
import { getRoleDisplayName } from "@/lib/roleColors"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUser(getUser())
  }, [])

  const dashboardTitle = user ? getRoleDisplayName(user.role) : "Dashboard"

  return (
    <header className="h-14 sm:h-16 border-b border-gray-200 bg-white sticky top-0 z-30">
      <div className="flex h-full items-center justify-between px-3 sm:px-4 md:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <h2 
            className="text-base sm:text-lg font-semibold truncate" 
            style={{ color: "#8faa76" }}
          >
            {dashboardTitle}
          </h2>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {mounted && user && (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* User info - hide on very small screens */}
              <div className="hidden sm:block text-right">
                <p className="text-xs sm:text-sm font-medium truncate max-w-[120px] md:max-w-none">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[120px] md:max-w-none">
                  {user.email}
                </p>
              </div>
              {/* Avatar - always visible */}
              <div
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0"
                style={{
                  backgroundColor: "#8faa76",
                }}
                title={`${user.firstName} ${user.lastName}`}
              >
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

