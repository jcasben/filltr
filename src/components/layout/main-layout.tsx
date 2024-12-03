import { ReactNode } from "react"
import {TopHeader} from "../navigation/top-header"
import { BottomNav } from "../navigation/bottom-nav"

interface MainLayoutProps {
    children: ReactNode
    activeView?: string
    setActiveView?: (view: string) => void
}

export default function MainLayout({ children, activeView, setActiveView }: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            { 
                activeView !== undefined && setActiveView !== undefined && (
                    <TopHeader activeView={activeView} setActiveView={setActiveView} />
                ) 
            }
            <main className="flex-1 container mx-auto max-w-2xl px-4 py-6">
                { children }
            </main>
            <BottomNav />
        </div>
    )
}