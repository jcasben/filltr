"use client"

import { Home, PlusCircle, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from 'next/navigation'

export function BottomNav() {
    const router = useRouter()
    const pathname = usePathname()

    const navigate = (path: string) => {
        router.push(path)
    }

    return (
        <nav className="sticky bottom-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-2xl items-stretch justify-around p-0 border-t border-gray-200">
                <Button
                    variant="ghost"
                    size="icon"
                    className={`flex-col items-center justify-center w-full h-full gap-1 ${pathname === '/' ? 'bg-primary/10 text-primary font-semibold border-t-4 border-primary' : ''}`}
                    onClick={() => navigate('/')}
                >
                    <Home className="h-6 w-6" />
                    <span className="text-xs font-medium">Home</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`flex-col items-center justify-center w-full h-full gap-1 ${pathname === '/create' ? 'bg-primary/10 text-primary font-semibold border-t-4 border-primary' : ''}`}
                    onClick={() => navigate('/create')}
                >
                    <PlusCircle className="h-6 w-6" />
                    <span className="text-xs font-medium">Create</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`flex-col items-center justify-center w-full h-full gap-1 ${pathname === '/profile' ? 'bg-primary/10 text-primary font-semibold border-t-4 border-primary' : ''}`}
                    onClick={() => navigate('/profile')}
                >
                    <User className="h-6 w-6" />
                    <span className="text-xs font-medium">Profile</span>
                </Button>
            </div>
        </nav>
    )
}

