import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Heart, MessageCircle, MoreHorizontal, Share, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'

interface PostCardProps {
    avatar: string
    username: string
    content: string
    timestamp: string
    network: 'twitter' | 'facebook' | 'instagram' | 'linkedin'
}

export function PostCard({ avatar, username, content, timestamp, network }: PostCardProps) {
    const NetworkIcon = {
        twitter: Twitter,
        facebook: Facebook,
        instagram: Instagram,
        linkedin: Linkedin
    }[network]

    return (
        <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center">
                        <p className="text-sm font-medium leading-none">{username}</p>
                        <NetworkIcon className="h-4 w-4 ml-2 text-muted-foreground" />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">{timestamp}</p>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm">{content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
                    Like
                </Button>
                <Button variant="ghost" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Reply
                </Button>
                <Button variant="ghost" size="sm">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </CardFooter>
        </Card>
    )
}

