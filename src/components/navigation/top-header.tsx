"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface TopHeaderProps {
    activeView: string
    setActiveView: (view: string) => void
}

export function TopHeader({ activeView, setActiveView }: TopHeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-2xl items-center justify-between mx-auto">
                <ToggleGroup type="single" value={activeView} onValueChange={(value) => value && setActiveView(value)} className="flex justify-around mx-auto">
                    <ToggleGroupItem value="posts">Posts</ToggleGroupItem>
                    <ToggleGroupItem value="messages">Messages</ToggleGroupItem>
                </ToggleGroup>
            </div>
        </header>
    )
}

