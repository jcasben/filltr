"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function CreatePage() {
    const [contentType, setContentType] = useState<"post" | "message">("post")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [platforms, setPlatforms] = useState({
        twitter: false,
        facebook: false,
        instagram: false,
        linkedin: false,
    })

    const handlePlatformChange = (platform: keyof typeof platforms) => {
        setPlatforms(prev => ({ ...prev, [platform]: !prev[platform] }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would handle the submission logic
        console.log({
            type: contentType,
            title,
            content,
            platforms,
        })
    }

    return (
        <MainLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Create {contentType === "post" ? "Post" : "Message"}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Select content type</Label>
                        <RadioGroup defaultValue="post" onValueChange={(value) => setContentType(value as "post" | "message")}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="post" id="post" />
                                <Label htmlFor="post">Post</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="message" id="message" />
                                <Label htmlFor="message">Message</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {contentType === "post" && (
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter post title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="content">{contentType === "post" ? "Post Content" : "Message"}</Label>
                        <Textarea
                            id="content"
                            placeholder={`What's on your mind?`}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Select platforms to distribute</Label>
                        <div className="flex flex-wrap gap-4">
                            {Object.entries(platforms).map(([platform, isChecked]) => (
                                <div key={platform} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={platform}
                                        checked={isChecked}
                                        onCheckedChange={() => handlePlatformChange(platform as keyof typeof platforms)}
                                    />
                                    <Label htmlFor={platform} className="flex items-center space-x-1">
                                        {platform === "twitter" && <Twitter className="h-4 w-4" />}
                                        {platform === "facebook" && <Facebook className="h-4 w-4" />}
                                        {platform === "instagram" && <Instagram className="h-4 w-4" />}
                                        {platform === "linkedin" && <Linkedin className="h-4 w-4" />}
                                        <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="submit">
                        {contentType === "post" ? "Create Post" : "Send Message"}
                    </Button>
                </form>
            </div>
        </MainLayout>
    )
}

