import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import {Facebook, Heart, Instagram, Linkedin, MessageCircle, Share, Twitter} from 'lucide-react'

interface PostCardProps {
    avatar: string
    username: string
    content: string
    day: string
    month: string
    year: string
    hour: string
    network: 'twitter' | 'facebook' | 'instagram' | 'linkedin'
}

export function PostCard({ avatar, username, content, day, month, year, hour, network }: PostCardProps) {
    const NetworkIcon = {
        twitter: Twitter,
        facebook: Facebook,
        instagram: Instagram,
        linkedin: Linkedin
    }[network]

    return (
        <Card className="mb-4">
            <CardHeader className="p-4">
                <div className="flex items-start space-x-4">
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
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
                <p className="text-sm break-words">{content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Like</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Reply</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                    <Share className="mr-2 h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Share</span>
                </Button>
            </CardFooter>
        </Card>
    )
}