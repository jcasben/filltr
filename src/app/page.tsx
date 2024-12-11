"use client"

import React, {useState, useEffect} from "react"
import {MainLayout} from "@/components/layout/main-layout"
import {PostCard} from "@/components/post/post-card"
import {MessageCard} from "@/components/message/message-card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { Filter, MessageSquare, X, Check, Search } from 'lucide-react'
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
        avatar: "https://example.com/avatar1.png",
        username: "Alice Johnson",
        content: "Had an amazing coffee this morning! ☕️ What's your favorite morning drink?",
        day: "11",
        month: "12",
        year: "2024",
        hour: "08:30",
        network: "facebook",
    },
    {
        id: 2,
        avatar: "https://example.com/avatar2.png",
        username: "Bob Williams",
        content: "Just finished a 5-mile run! Feeling great! 💪🏃‍♂️ #fitness #motivation",
        day: "11",
        month: "12",
        year: "2024",
        hour: "09:15",
        network: "twitter",
    },
    {
        id: 3,
        avatar: "https://example.com/avatar3.png",
        username: "Charlie Brown",
        content: "Can’t believe how much this new project management tool has improved my workflow. Highly recommend! 🧑‍💻 #worktools",
        day: "11",
        month: "12",
        year: "2024",
        hour: "10:00",
        network: "linkedin",
    },
    {
        id: 4,
        avatar: "https://example.com/avatar4.png",
        username: "David Clark",
        content: "Exploring new restaurants in the city! 🍝 What’s your favorite type of cuisine?",
        day: "11",
        month: "12",
        year: "2024",
        hour: "11:45",
        network: "instagram",
    },
    {
        id: 5,
        avatar: "https://example.com/avatar5.png",
        username: "Eva Turner",
        content: "The new album from my favorite artist is out today! 🎶 You should definitely check it out.",
        day: "11",
        month: "12",
        year: "2024",
        hour: "12:30",
        network: "facebook",
    },
    {
        id: 6,
        avatar: "https://example.com/avatar6.png",
        username: "Frank Harris",
        content: "Just signed up for a coding bootcamp! 🚀 I'm excited to dive deeper into Python!",
        day: "11",
        month: "12",
        year: "2024",
        hour: "13:10",
        network: "linkedin",
    },
    {
        id: 7,
        avatar: "https://example.com/avatar7.png",
        username: "Grace Miller",
        content: "Looking for some movie recommendations! What have you been watching lately? 🎬",
        day: "11",
        month: "12",
        year: "2024",
        hour: "14:00",
        network: "instagram",
    },
    {
        id: 8,
        avatar: "https://example.com/avatar8.png",
        username: "Hank Lewis",
        content: "Got some new tech gadgets today! Time to test them out. 😎 #techlover",
        day: "11",
        month: "12",
        year: "2024",
        hour: "15:25",
        network: "facebook",
    },
    {
        id: 9,
        avatar: "https://example.com/avatar9.png",
        username: "Ivy Scott",
        content: "Just wrapped up an amazing meeting with the team. So many exciting things ahead! 🚀",
        day: "11",
        month: "12",
        year: "2024",
        hour: "16:10",
        network: "linkedin",
    },
    {
        id: 10,
        avatar: "https://example.com/avatar10.png",
        username: "Jake Adams",
        content: "Anyone know of good hiking trails in the area? I’m looking for new places to explore. 🏞️ #hikingadventures",
        day: "11",
        month: "12",
        year: "2024",
        hour: "17:00",
        network: "instagram",
    },
    {
        id: 11,
        avatar: "https://example.com/avatar11.png",
        username: "Karen Moore",
        content: "It’s always a good time when I’m at the beach. Can’t get enough of the ocean breeze! 🌊 #beachlife",
        day: "11",
        month: "12",
        year: "2024",
        hour: "18:30",
        network: "facebook",
    },
    {
        id: 12,
        avatar: "https://example.com/avatar12.png",
        username: "Leo Harris",
        content: "What are your thoughts on the latest AI developments? It’s getting crazy fast. 🤖 #artificialintelligence",
        day: "11",
        month: "12",
        year: "2024",
        hour: "19:15",
        network: "twitter",
    },
    {
        id: 13,
        avatar: "https://example.com/avatar13.png",
        username: "Mia Reed",
        content: "Finally finished that book! Now on to the next one. 📚 What are you reading?",
        day: "11",
        month: "12",
        year: "2024",
        hour: "20:00",
        network: "instagram",
    },
    {
        id: 14,
        avatar: "https://example.com/avatar14.png",
        username: "Nina Carter",
        content: "Got my hands on the new smartwatch! Excited to see what it can do. ⌚️ #gadgets",
        day: "11",
        month: "12",
        year: "2024",
        hour: "21:00",
        network: "facebook",
    },
    {
        id: 15,
        avatar: "https://example.com/avatar15.png",
        username: "Oscar Evans",
        content: "It’s so cozy today! Perfect weather for a movie night. 🍿🎥 #cozyvibes",
        day: "11",
        month: "12",
        year: "2024",
        hour: "22:00",
        network: "instagram",
    },
];


const allMessages: Message[] = [
    {
        id: 1,
        avatar: "https://example.com/avatar1.png",
        username: "Alice Johnson",
        lastMessage: "Happy Birthday! 🎉 Wishing you all the best on your special day! 🥳",
        day: "11",
        month: "12",
        year: "2024",
        hour: "08:30",
        network: "facebook",
    },
    {
        id: 2,
        avatar: "https://example.com/avatar2.png",
        username: "Bob Williams",
        lastMessage: "I'm going to Bratislava next week. Any recommendations?",
        day: "11",
        month: "12",
        year: "2024",
        hour: "09:15",
        network: "twitter",
    },
    {
        id: 3,
        avatar: "https://example.com/avatar3.png",
        username: "Charlie Brown",
        lastMessage: "Hey, I heard there’s a new tech conference happening soon. We should go together!",
        day: "11",
        month: "12",
        year: "2024",
        hour: "10:00",
        network: "linkedin",
    },
    {
        id: 4,
        avatar: "https://example.com/avatar4.png",
        username: "David Clark",
        lastMessage: "Have you seen this? I can't believe it...",
        day: "11",
        month: "12",
        year: "2024",
        hour: "11:45",
        network: "instagram",
    },
    {
        id: 5,
        avatar: "https://example.com/avatar5.png",
        username: "Eva Turner",
        lastMessage: "Hey! Just saw that movie you recommended. It was so good! Let’s talk about it soon.",
        day: "11",
        month: "12",
        year: "2024",
        hour: "12:30",
        network: "facebook",
    },
    {
        id: 6,
        avatar: "https://example.com/avatar6.png",
        username: "Frank Harris",
        lastMessage: "Happy Birthday! 🎉 Hope it’s a day full of happiness and surprises!",
        day: "11",
        month: "12",
        year: "2024",
        hour: "13:10",
        network: "linkedin",
    },
    {
        id: 7,
        avatar: "https://example.com/avatar7.png",
        username: "Grace Miller",
        lastMessage: "Got some new hiking boots today! Ready for our next adventure? 🏞️",
        day: "11",
        month: "12",
        year: "2024",
        hour: "14:00",
        network: "instagram",
    },
    {
        id: 8,
        avatar: "https://example.com/avatar8.png",
        username: "Hank Lewis",
        lastMessage: "Happy Birthday! Hope you’re surrounded by love and joy today! 🎂🎉",
        day: "11",
        month: "12",
        year: "2024",
        hour: "15:25",
        network: "facebook",
    },
    {
        id: 9,
        avatar: "https://example.com/avatar9.png",
        username: "Ivy Scott",
        lastMessage: "You’ve got to try this new restaurant, it’s amazing! Let me know when you’re free to go!",
        day: "11",
        month: "12",
        year: "2024",
        hour: "16:10",
        network: "linkedin",
    },
    {
        id: 10,
        avatar: "https://example.com/avatar10.png",
        username: "Jake Adams",
        lastMessage: "Can you help me with the AI assignment? It is really ruining my day :(",
        day: "11",
        month: "12",
        year: "2024",
        hour: "17:00",
        network: "instagram",
    },
    {
        id: 11,
        avatar: "https://example.com/avatar11.png",
        username: "Karen Moore",
        lastMessage: "Looking forward to the weekend getaway! Do you have any recommendations for places to visit?",
        day: "11",
        month: "12",
        year: "2024",
        hour: "18:30",
        network: "facebook",
    },
    {
        id: 12,
        avatar: "https://example.com/avatar12.png",
        username: "Leo Harris",
        lastMessage: "Happy Birthday! 🎉 Hope you have a fantastic day filled with joy and laughter!",
        day: "11",
        month: "12",
        year: "2024",
        hour: "19:15",
        network: "twitter",
    },
    {
        id: 13,
        avatar: "https://example.com/avatar13.png",
        username: "Mia Reed",
        lastMessage: "What’s up with you lately? Let’s catch up soon!",
        day: "11",
        month: "12",
        year: "2024",
        hour: "20:00",
        network: "instagram",
    },
    {
        id: 14,
        avatar: "https://example.com/avatar14.png",
        username: "Nina Carter",
        lastMessage: "A long time without seeing your parents. Memories from me to them!",
        day: "11",
        month: "12",
        year: "2024",
        hour: "21:00",
        network: "facebook",
    },
    {
        id: 15,
        avatar: "https://example.com/avatar15.png",
        username: "Oscar Evans",
        lastMessage: "Can’t wait to see you at the concert this weekend! 🎶",
        day: "11",
        month: "12",
        year: "2024",
        hour: "22:00",
        network: "instagram",
    },
];

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

    const clearSearch = () => {
        setSearchQuery("")
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
                    <div className="relative flex-grow">
                        <Input
                            type="text"
                            placeholder="Search by name, keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pr-10"
                        />
                        {searchQuery && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={clearSearch}
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Clear search</span>
                            </Button>
                        )}
                    </div>
                    <Button type="button" variant="outline" onClick={handleFilter}>
                        <Filter className="h-4 w-4"/>
                    </Button>
                </form>

                {activeView === "posts" && (
                    <div className="posts">
                        <p className="text-sm text-muted-foreground mb-2">
                            Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
                        </p>
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
                            <p className="text-center text-gray-500 mt-4">
                                No posts found matching your search (out of {allPosts.length} total posts).
                            </p>
                        )}
                    </div>
                )}
                {activeView === "messages" && (
                    <div className="messages">
                        <p className="text-sm text-muted-foreground mb-2">
                            Showing {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''}
                        </p>
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
                            <p className="text-center text-gray-500 mt-4">
                                No messages found matching your search (out of {allMessages.length} total messages).
                            </p>
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