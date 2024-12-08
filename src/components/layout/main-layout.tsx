"use client"

import { ReactNode } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { BottomNav } from "../navigation/bottom-nav"
import { Logo } from "@/components/ui/logo"

interface MainLayoutProps {
    children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-2xl items-center justify-between mx-auto px-4">
                    <Logo className="mr-4" />
                    <ThemeToggle />
                </div>
            </header>
            <main className="flex-1 container mx-auto max-w-2xl px-4 py-6">
                {children}
            </main>
            <BottomNav />
        </div>
    )
}

