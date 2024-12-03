"use client"

import { usePathname, useRouter } from 'next/navigation'
import { Home, PlusCircle, Search, User } from 'lucide-react'
import { Button } from '../ui/button'

export function BottomNav() {
    const router = useRouter()
    const pathname = usePathname()

    const navigate = (path: string) => {
        router.push(path)
    }

    return (
        <nav className="sticky bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-2xl items-center justify-around mx-auto">
                <Button
                    variant="ghost"
                    size="icon"
                    className={`flex-col gap-1 ${pathname === '/' ? 'text-primary' : ''}`}
                    onClick={() => navigate('/')}
                >
                    <Home className="h-5 w-5" />
                    <span className="text-xs">Home</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`flex-col gap-1 ${pathname === '/search' ? 'text-primary' : ''}`}
                    onClick={() => navigate('/search')}
                >
                    <Search className="h-5 w-5" />
                    <span className="text-xs">Search</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`flex-col gap-1 ${pathname === '/create' ? 'text-primary' : ''}`}
                    onClick={() => navigate('/create')}
                >
                    <PlusCircle className="h-5 w-5" />
                    <span className="text-xs">Create</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`flex-col gap-1 ${pathname === '/profile' ? 'text-primary' : ''}`}
                    onClick={() => navigate('/profile')}
                >
                    <User className="h-5 w-5" />
                    <span className="text-xs">Profile</span>
                </Button>
            </div>
        </nav>
    )
}