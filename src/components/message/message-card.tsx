import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardContent } from "../ui/card"
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'

interface MessageCardProps {
    avatar: string
    username: string
    lastMessage: string
    timestamp: string
    network: 'twitter' | 'facebook' | 'instagram' | 'linkedin'
}

export function MessageCard({ avatar, username, lastMessage, timestamp, network }: MessageCardProps) {
    const NetworkIcon = {
        twitter: Twitter,
        facebook: Facebook,
        instagram: Instagram,
        linkedin: Linkedin
    }[network]

    return (
        <Card className="mb-2">
            <CardContent className="p-4 flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                        <p className="text-sm font-medium truncate">{username}</p>
                        <NetworkIcon className="h-4 w-4 ml-2 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
                </div>
                <div className="text-xs text-muted-foreground">{timestamp}</div>
            </CardContent>
        </Card>
    )
}

