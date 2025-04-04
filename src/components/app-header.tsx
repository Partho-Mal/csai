"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, Settings, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

export function AppHeader() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null)

  // Simulating user authentication fetch (Replace with actual API call)
  useEffect(() => {
    // Fetch user data from API or localStorage
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me") // Replace with your actual API
        if (!res.ok) throw new Error("Failed to fetch user")
        const data = await res.json()
        setUser(data)
      } catch (error) {
        console.error("User fetch error:", error)
      }
    }

    fetchUser()
  }, [])

  // Logout function

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", { method: "GET" });
      if (!res.ok) throw new Error("Logout failed");
  
      setUser(null); // Clear user state
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-800 bg-slate-900/95 px-4 backdrop-blur-sm">
      <SidebarTrigger className="text-slate-400 hover:text-white" />
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
        <Input
          type="search"
          placeholder="Search threats, alerts, users..."
          className="w-full bg-slate-800 border-slate-700 pl-9 text-sm text-slate-300 placeholder:text-slate-500 focus-visible:ring-slate-700"
        />
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 p-0 text-[10px] font-bold text-white">
            3
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="h-8 w-8 border border-slate-700">
                <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} alt="User" />
                <AvatarFallback className="bg-slate-800 text-slate-300">
                  {user?.name ? user.name[0].toUpperCase() : "SC"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-slate-800 border-slate-700">
            <div className="px-4 py-2 text-sm text-slate-300">{user?.name || "Loading..."}</div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
