"use client"

import { Logo } from "@/components/ui/logo"

export function TopHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-2xl items-center justify-between mx-auto px-4">
                <Logo className="mr-4" />
            </div>
        </header>
    )
}

