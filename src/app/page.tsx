"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import { PostCard } from "@/components/post/post-card"
import { MessageCard } from "@/components/message/message-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter } from 'lucide-react'
import { FilterModal, FilterOptions } from "@/components/filter/filter-modal"

// Define types for our data
type Post = {
    id: number;
    avatar: string;
    username: string;
    content: string;
    day: string;
    month: string;
    year: string;
    hour: string;
    network: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
}

type Message = {
    id: number;
    avatar: string;
    username: string;
    lastMessage: string;
    day: string;
    month: string;
    year: string;
    hour: string;
    network: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
}

// Sample data
const allPosts: Post[] = [
    {
        id: 1,
        avatar: "/placeholder.svg",
        username: "John Doe",
        content: "Just posted something amazing! Check it out!",
        day: "15",
        month: "05",
        year: "2023",
        hour: "10:19",
        network: "twitter"
    },
    {
        id: 2,
        avatar: "/placeholder.svg",
        username: "Jane Smith",
        content: "Having a great day! How's everyone doing?",
        day: "14",
        month: "05",
        year: "2023",
        hour: "10:19",
        network: "facebook"
    },
    {
        id: 3,
        avatar: "/placeholder.svg",
        username: "Alice Johnson",
        content: "New blog post is up! Link in bio.",
        day: "13",
        month: "05",
        year: "2023",
        hour: "10:19",
        network: "instagram"
    }
]

const allMessages: Message[] = [
    {
        id: 1,
        avatar: "/placeholder.svg",
        username: "Alice Johnson",
        lastMessage: "Hey, how are you doing?",
        day: "15",
        month: "05",
        year: "2023",
        hour: "10:19",
        network: "twitter"
    },
    {
        id: 2,
        avatar: "/placeholder.svg",
        username: "Bob Williams",
        lastMessage: "Did you see the latest update?",
        day: "14",
        month: "05",
        year: "2023",
        hour: "10:19",
        network: "linkedin"
    },
    {
        id: 3,
        avatar: "/placeholder.svg",
        username: "Charlie Brown",
        lastMessage: "Let's catch up soon!",
        day: "13",
        month: "05",
        year: "2023",
        hour: "10:19",
        network: "facebook"
    }
]

export default function Home() {
    const [activeView, setActiveView] = useState("posts")
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredPosts, setFilteredPosts] = useState(allPosts)
    const [filteredMessages, setFilteredMessages] = useState(allMessages)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [filters, setFilters] = useState<FilterOptions>({
        startDate: undefined,
        endDate: undefined,
        twitter: true,
        facebook: true,
        instagram: true,
        linkedin: true,
    })

    useEffect(() => {
        const filterByDate = (item: Post | Message) => {
            if (!filters.startDate && !filters.endDate) return true
            const itemDate = new Date(`${item.year}-${item.month}-${item.day}`)
            if (filters.startDate) {
                const startDate = new Date(`${filters.startDate.year}-${filters.startDate.month}-${filters.startDate.day}`)
                if (itemDate < startDate) return false
            }
            if (filters.endDate) {
                const endDate = new Date(`${filters.endDate.year}-${filters.endDate.month}-${filters.endDate.day}`)
                if (itemDate > endDate) return false
            }
            return true
        }

        const filterByNetwork = (item: Post | Message) => {
            return filters[item.network]
        }

        const filterItem = (item: Post | Message) => {
            const matchesSearch =
                item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ('content' in item
                    ? item.content.toLowerCase().includes(searchQuery.toLowerCase())
                    : item.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesSearch && filterByDate(item) && filterByNetwork(item)
        }

        setFilteredPosts(allPosts.filter(filterItem))
        setFilteredMessages(allMessages.filter(filterItem))
    }, [searchQuery, filters, allPosts, allMessages])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Search is already handled by the useEffect hook
    }

    const handleFilter = () => {
        setIsFilterModalOpen(true)
    }

    const handleApplyFilters = (newFilters: FilterOptions) => {
        setFilters(newFilters)
        setIsFilterModalOpen(false)
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
                                day={post.day}
                                month={post.month}
                                year={post.year}
                                hour={post.hour}
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
                                day={message.day}
                                month={message.month}
                                year={message.year}
                                hour={message.hour}
                                network={message.network}
                            />
                        ))}
                        {filteredMessages.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">No messages found matching your search.</p>
                        )}
                    </div>
                )}
            </div>
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApplyFilters={handleApplyFilters}
            />
        </MainLayout>
    )
}

