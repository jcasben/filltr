"use client"

import {useState} from "react"
import {MainLayout} from "@/components/layout/main-layout"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Switch} from "@/components/ui/switch"
import {Label} from "@/components/ui/label"
import {Facebook, Twitter, Instagram, Linkedin, LogOut, Plus} from 'lucide-react'

export default function ProfilePage() {
    const [connectedAccounts, setConnectedAccounts] = useState({
        facebook: true,
        twitter: true,
        instagram: false,
        linkedin: false,
    })

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        messageNotifications: true,
    })

    const toggleAccount = (account: keyof typeof connectedAccounts) => {
        setConnectedAccounts(prev => ({...prev, [account]: !prev[account]}))
    }

    const toggleSetting = (setting: keyof typeof notificationSettings) => {
        setNotificationSettings(prev => ({...prev, [setting]: !prev[setting]}))
    }

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logging out...")
    }

    const handleAddSocialMedia = () => {
        // Implement add social media logic here
        console.log("Adding new social media account...")
    }

    return (
        <MainLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Profile</h1>
                    <Button variant="destructive" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4"/> Logout
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Connected Accounts</CardTitle>
                        <CardDescription>Manage your connected social media accounts</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Facebook className="w-6 h-6 text-blue-600"/>
                                <span>Facebook</span>
                            </div>
                            <Switch
                                checked={connectedAccounts.facebook}
                                onCheckedChange={() => toggleAccount('facebook')}
                            />
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Twitter className="w-6 h-6 text-blue-400"/>
                                <span>Twitter</span>
                            </div>
                            <Switch
                                checked={connectedAccounts.twitter}
                                onCheckedChange={() => toggleAccount('twitter')}
                            />
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Instagram className="w-6 h-6 text-pink-500"/>
                                <span>Instagram</span>
                            </div>
                            <Switch
                                checked={connectedAccounts.instagram}
                                onCheckedChange={() => toggleAccount('instagram')}
                            />
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Linkedin className="w-6 h-6 text-blue-700"/>
                                <span>LinkedIn</span>
                            </div>
                            <Switch
                                checked={connectedAccounts.linkedin}
                                onCheckedChange={() => toggleAccount('linkedin')}
                            />
                        </div>
                        <Button onClick={handleAddSocialMedia} className="w-full">
                            <Plus className="mr-2 h-4 w-4"/> Add Social Media Account
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>Manage your notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="flex items-center justify-between space-x-4">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <Switch
                                id="email-notifications"
                                checked={notificationSettings.emailNotifications}
                                onCheckedChange={() => toggleSetting('emailNotifications')}
                            />
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <Switch
                                id="push-notifications"
                                checked={notificationSettings.pushNotifications}
                                onCheckedChange={() => toggleSetting('pushNotifications')}
                            />
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <Label htmlFor="message-notifications">Message Notifications</Label>
                            <Switch
                                id="message-notifications"
                                checked={notificationSettings.messageNotifications}
                                onCheckedChange={() => toggleSetting('messageNotifications')}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button className="w-full">Save Changes</Button>
            </div>
        </MainLayout>
    )
}

