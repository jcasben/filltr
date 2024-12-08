import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"

interface MessageCardProps {
    avatar: string
    username: string
    lastMessage: string
    day: string
    month: string
    year: string
    hour: string
    network: 'twitter' | 'facebook' | 'instagram' | 'linkedin'
    isSelected: boolean
    onSelect: (isSelected: boolean) => void
}

export function MessageCard({ avatar, username, lastMessage, day, month, year, hour, network, isSelected, onSelect }: MessageCardProps) {
    const NetworkIcon = {
        twitter: Twitter,
        facebook: Facebook,
        instagram: Instagram,
        linkedin: Linkedin
    }[network]

    return (
        <Card className="mb-2">
            <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                    <Checkbox
                        checked={isSelected}
                        onCheckedChange={onSelect}
                        className="mt-1 mr-2"
                    />
                    <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium">{username}</p>
                                <NetworkIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 sm:mt-0">{`${day}/${month}/${year} ${hour}`}</div>
                        </div>
                        <p className="text-sm text-muted-foreground break-words line-clamp-2 sm:line-clamp-none">{lastMessage}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

