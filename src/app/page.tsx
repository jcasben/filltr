"use client"

import React, {useState, useEffect} from "react"
import {MainLayout} from "@/components/layout/main-layout"
import {PostCard} from "@/components/post/post-card"
import {MessageCard} from "@/components/message/message-card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { Filter, MessageSquare, X, Check } from 'lucide-react'
import {FilterModal, FilterOptions} from "@/components/filter/filter-modal"
import {MultiReply} from "@/components/message/multi-reply"
import {Snackbar} from "@/components/ui/snackbar"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

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
    const [activeView, setActiveView] = useState("messages")
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
    const [selectedMessages, setSelectedMessages] = useState<number[]>([])
    const [isMultiReplyActive, setIsMultiReplyActive] = useState(false)
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false)

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

    const handleMessageSelect = (id: number, isSelected: boolean) => {
        setSelectedMessages(prev =>
            isSelected ? [...prev, id] : prev.filter(messageId => messageId !== id)
        )
    }

    const handleReplyAll = () => {
        if (selectedMessages.length === filteredMessages.length) {
            // If all messages are selected, deselect all and hide reply panel
            setSelectedMessages([])
            setIsMultiReplyActive(false)
        } else {
            // Otherwise, select all messages
            setSelectedMessages(filteredMessages.map(message => message.id))
        }
    }

    const handleMultiReplyActivate = () => {
        if (selectedMessages.length > 0) {
            setIsMultiReplyActive(true)
        }
    }

    const handleMultiReplyCancel = () => {
        setIsMultiReplyActive(false)
    }

    const handleMultiReplySend = (message: string) => {
        console.log(`Sending "${message}" to messages with IDs:`, selectedMessages)
        setIsMultiReplyActive(false)
        setSelectedMessages([])
        setIsSnackbarVisible(true)
    }

    const replyAllButton = () => {
        if (selectedMessages.length === 0) {
            return (
                <Button
                    onClick={handleReplyAll}
                    size="lg"
                    variant={selectedMessages.length === filteredMessages.length ? "default" : "outline"}
                    className="flex-1 mb-4 bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
                >
                    <MessageSquare className="h-5 w-5 mr-2"/>
                    Reply All
                </Button>
            )
        } else if (selectedMessages.length < filteredMessages.length) {
            return (
                <Button
                    onClick={handleReplyAll}
                    size="lg"
                    variant={selectedMessages.length === filteredMessages.length ? "default" : "outline"}
                    className="flex-1 mb-4"
                >
                    <Check className="h-5 w-5 mr-2"/>
                    Select All
                </Button>
            )
        } else {
            return (
                <Button
                    onClick={handleReplyAll}
                    size="lg"
                    variant={selectedMessages.length === filteredMessages.length ? "default" : "outline"}
                    className="flex-1 mb-4"
                >
                    <X className="h-5 w-5 mr-2"/>
                    Deselect All
                </Button>
            )
        }
    }

    return (
        <MainLayout>
            <div className="bg-primary/10 p-3 rounded-lg mb-4">
                <ToggleGroup
                    type="single"
                    value={activeView}
                    onValueChange={(value) => value && setActiveView(value)}
                    className="flex justify-center w-full"
                >
                    <ToggleGroupItem
                        value="messages"
                        className="w-1/2 px-3 py-2 text-base font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                        Messages
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="posts"
                        className="w-1/2 px-3 py-2 text-base font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                        Posts
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className="space-y-4">
                <form onSubmit={handleSearch} className="flex space-x-2">
                    <Input
                        type="text"
                        placeholder="Search by name, keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow"
                    />
                    <Button type="button" variant="outline" onClick={handleFilter}>
                        <Filter className="h-4 w-4"/>
                    </Button>
                </form>

                {activeView === "posts" && (
                    <div className="posts">
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
                        <div className="flex space-x-2 mb-4">
                            {replyAllButton()}
                            {selectedMessages.length > 0 && (
                                <Button
                                    onClick={handleMultiReplyActivate}
                                    size="lg"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
                                >
                                    <MessageSquare className="h-5 w-5 mr-2"/>
                                    Reply to Selected
                                </Button>
                            )}
                        </div>
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
                                isSelected={selectedMessages.includes(message.id)}
                                onSelect={(isSelected) => handleMessageSelect(message.id, isSelected)}
                            />
                        ))}
                        {filteredMessages.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">No messages found matching your
                                search.</p>
                        )}
                    </div>
                )}
            </div>
            {isMultiReplyActive && selectedMessages.length > 0 && (
                <MultiReply
                    onSend={handleMultiReplySend}
                    onCancel={handleMultiReplyCancel}
                />
            )}
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApplyFilters={handleApplyFilters}
            />
            <Snackbar
                message="Replied to messages successfully!"
                isVisible={isSnackbarVisible}
                onClose={() => setIsSnackbarVisible(false)}
            />
        </MainLayout>
    )
}

