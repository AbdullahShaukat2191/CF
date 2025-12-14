"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Receipt,
  UserCheck,
  Calendar,
  BookOpen,
  BarChart3,
  LogOut,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logout, getUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { getRoleColors } from "@/lib/roleColors"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Credit Reports", href: "/dashboard/credit", icon: FileText },
  { name: "Offers", href: "/dashboard/offers", icon: DollarSign },
  { name: "Transactions", href: "/dashboard/transactions", icon: Receipt },
  { name: "Referrals", href: "/dashboard/referrals", icon: UserCheck },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Training", href: "/dashboard/training", icon: BookOpen },
  { name: "Admin", href: "/dashboard/admin", icon: BarChart3 },
]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUser(getUser())
  }, [])

  const roleColors = user ? getRoleColors(user.role) : null

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    if (onClose) {
      onClose()
    }
  }

  return (
    <div
      className="flex h-full w-64 flex-col border-r border-gray-200 bg-white lg:bg-transparent"
      style={{ backgroundColor: roleColors?.sidebarBg || "#ffffff" }}
    >
      <div className="flex h-14 sm:h-16 items-center justify-between border-b border-gray-200 px-4 sm:px-6">
        <h1 className="text-lg sm:text-xl font-bold text-white truncate">Credit Platform</h1>
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        )}
      </div>
      <nav className="flex-1 space-y-1 px-2 sm:px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-2 sm:gap-3 rounded-lg px-2 sm:px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-white"
                  : "text-gray-200 hover:bg-white/10"
              )}
              style={
                isActive
                  ? {
                      backgroundColor: roleColors?.primary || "#8faa76",
                    }
                  : {}
              }
            >
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-white/20 p-3 sm:p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 sm:gap-3 rounded-lg px-2 sm:px-3 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
          <span className="truncate">Logout</span>
        </button>
      </div>
    </div>
  )
}

