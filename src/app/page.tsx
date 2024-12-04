"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import { PostCard } from "@/components/post/post-card"
import { MessageCard } from "@/components/message/message-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter } from 'lucide-react'

// Define types for our data
type Post = {
    id: number;
    avatar: string;
    username: string;
    content: string;
    timestamp: string;
    network: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
}

type Message = {
    id: number;
    avatar: string;
    username: string;
    lastMessage: string;
    timestamp: string;
    network: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
}

// Sample data
const allPosts: Post[] = [
    {
        id: 1,
        avatar: "/placeholder.svg",
        username: "John Doe",
        content: "Just posted something amazing! Check it out!",
        timestamp: "2 hours ago",
        network: "twitter"
    },
    {
        id: 2,
        avatar: "/placeholder.svg",
        username: "Jane Smith",
        content: "Having a great day! How's everyone doing?",
        timestamp: "5 hours ago",
        network: "facebook"
    },
    {
        id: 3,
        avatar: "/placeholder.svg",
        username: "Alice Johnson",
        content: "New blog post is up! Link in bio.",
        timestamp: "1 day ago",
        network: "instagram"
    }
]

const allMessages: Message[] = [
    {
        id: 1,
        avatar: "/placeholder.svg",
        username: "Alice Johnson",
        lastMessage: "Hey, how are you doing?",
        timestamp: "10:30 AM",
        network: "twitter"
    },
    {
        id: 2,
        avatar: "/placeholder.svg",
        username: "Bob Williams",
        lastMessage: "Did you see the latest update?",
        timestamp: "Yesterday",
        network: "linkedin"
    },
    {
        id: 3,
        avatar: "/placeholder.svg",
        username: "Charlie Brown",
        lastMessage: "Let's catch up soon!",
        timestamp: "2 days ago",
        network: "facebook"
    }
]

export default function Home() {
    const [activeView, setActiveView] = useState("posts")
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredPosts, setFilteredPosts] = useState(allPosts)
    const [filteredMessages, setFilteredMessages] = useState(allMessages)

    useEffect(() => {
        if (activeView === "posts") {
            setFilteredPosts(
                allPosts.filter(post =>
                    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.username.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
        } else {
            setFilteredMessages(
                allMessages.filter(message =>
                    message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    message.username.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
        }
    }, [searchQuery, activeView])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Search is already handled by the useEffect hook
    }

    const handleFilter = () => {
        // Implement filter logic here
        console.log("Opening filter options")
    }

    return (
        <MainLayout activeView={activeView} setActiveView={setActiveView}>
            <div className="space-y-4">
                <form onSubmit={handleSearch} className="flex space-x-2">
                    <Input
                        type="text"
                        placeholder="Search posts and messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow"
                    />
                    <Button type="button" variant="outline" onClick={handleFilter}>
                        <Filter className="h-4 w-4" />
                    </Button>
                </form>

                {activeView === "posts" && (
                    <div className="posts">
                        <h2 className="text-lg font-semibold mb-2">Posts</h2>
                        {filteredPosts.map(post => (
                            <PostCard
                                key={post.id}
                                avatar={post.avatar}
                                username={post.username}
                                content={post.content}
                                timestamp={post.timestamp}
                                network={post.network}
                            />
                        ))}
                        {filteredPosts.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">No posts found matching your search.</p>
                        )}
                    </div>
                )}
                {activeView === "messages" && (
                    <div className="messages">
                        <h2 className="text-lg font-semibold mb-2">Messages</h2>
                        {filteredMessages.map(message => (
                            <MessageCard
                                key={message.id}
                                avatar={message.avatar}
                                username={message.username}
                                lastMessage={message.lastMessage}
                                timestamp={message.timestamp}
                                network={message.network}
                            />
                        ))}
                        {filteredMessages.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">No messages found matching your search.</p>
                        )}
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

