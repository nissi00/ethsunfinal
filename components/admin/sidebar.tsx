"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
    LayoutDashboard,
    MessageSquare,
    GraduationCap,
    Handshake,
    Palette,
    Settings,
    BarChart3,
    Quote,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
    {
        name: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        name: "Soumissions",
        icon: MessageSquare,
        children: [
            { name: "Contact", href: "/admin/submissions/contact" },
            { name: "Inscriptions", href: "/admin/submissions/inscription" },
            { name: "Franchise", href: "/admin/submissions/franchise" },
            { name: "Recrutement", href: "/admin/submissions/recruitment" },
        ],
    },
    {
        name: "Contenu",
        icon: BarChart3,
        children: [
            { name: "Statistiques", href: "/admin/content/stats" },
            { name: "Certifications", href: "/admin/content/certifications" },
            { name: "Offres d'emploi", href: "/admin/content/jobs" },
        ],
    },
    {
        name: "Partenaires",
        href: "/admin/partners",
        icon: Handshake,
    },
    {
        name: "Événements",
        href: "/admin/events",
        icon: Calendar,
    },
    {
        name: "Thème",
        href: "/admin/theme",
        icon: Palette,
    },
    {
        name: "Paramètres",
        href: "/admin/settings",
        icon: Settings,
    },
]

export function AdminSidebar() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [openMenus, setOpenMenus] = useState<string[]>(["Soumissions", "Contenu"])
    const [notifications, setNotifications] = useState({
        contact: 0,
        inscription: 0,
        franchise: 0,
        recruitment: 0,
        total: 0
    })

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await fetch("/api/admin/stats/notifications")
                if (res.ok) {
                    const data = await res.json()
                    setNotifications(data)
                }
            } catch (error) {
                console.error("Failed to fetch notifications", error)
            }
        }

        fetchNotifications()
        // Poll every minute
        const interval = setInterval(fetchNotifications, 60000)
        return () => clearInterval(interval)
    }, [])

    function getNotificationCount(href?: string) {
        if (!href) return 0
        if (href.includes("/contact")) return notifications.contact
        if (href.includes("/inscription")) return notifications.inscription
        if (href.includes("/franchise")) return notifications.franchise
        if (href.includes("/recruitment")) return notifications.recruitment
        return 0
    }

    function getTotalSubmissionsCount() {
        return notifications.total
    }

    function toggleMenu(name: string) {
        setOpenMenus((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        )
    }

    function NavItem({ item }: { item: (typeof navigation)[0] }) {
        const hasChildren = "children" in item && item.children
        const isOpen = openMenus.includes(item.name)
        const isActive = item.href === pathname

        // Calculate total notifications for parent item "Soumissions"
        const parentNotificationCount = item.name === "Soumissions" ? notifications.total : 0

        if (hasChildren) {
            return (
                <div>
                    <button
                        onClick={() => toggleMenu(item.name)}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            "text-gray-300 hover:bg-[#153D63] hover:text-white"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5" />
                            {item.name}
                            {parentNotificationCount > 0 && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                    {parentNotificationCount}
                                </span>
                            )}
                        </div>
                        <ChevronDown
                            className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
                        />
                    </button>
                    {isOpen && (
                        <div className="ml-8 mt-1 space-y-1">
                            {item.children.map((child) => {
                                const count = getNotificationCount(child.href)
                                return (
                                    <Link
                                        key={child.href}
                                        href={child.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                                            pathname === child.href
                                                ? "bg-[#C9A44A] text-[#0A2A43] font-semibold"
                                                : "text-gray-400 hover:bg-[#153D63] hover:text-white"
                                        )}
                                    >
                                        <span>{child.name}</span>
                                        {count > 0 && (
                                            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                                {count}
                                            </span>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </div>
            )
        }

        return (
            <Link
                href={item.href!}
                onClick={() => setMobileOpen(false)}
                className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                        ? "bg-[#C9A44A] text-[#0A2A43]"
                        : "text-gray-300 hover:bg-[#153D63] hover:text-white"
                )}
            >
                <div className="flex items-center gap-3 flex-1">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                </div>
            </Link>
        )
    }

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-[#153D63]">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C9A44A] rounded-lg flex items-center justify-center">
                        <span className="text-[#0A2A43] font-bold text-lg">E</span>
                    </div>
                    <div>
                        <div className="text-white font-serif font-bold">ETHSUN</div>
                        <div className="text-xs text-[#C9A44A]">Administration</div>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => (
                    <NavItem key={item.name} item={item} />
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[#153D63]">
                <Button
                    variant="ghost"
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#153D63]"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Déconnexion
                </Button>
                <Link
                    href="/"
                    className="mt-2 block text-center text-xs text-gray-500 hover:text-[#C9A44A] transition"
                >
                    ← Retour au site
                </Link>
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#0A2A43] text-white rounded-lg"
            >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0A2A43] min-h-screen transform transition-transform lg:transform-none",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <SidebarContent />
            </aside>
        </>
    )
}
