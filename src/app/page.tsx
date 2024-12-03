"use client"

import MainLayout from "@/components/layout/main-layout";
import {useState} from "react";
import {MessageCard} from "@/components/message/message-card";
import {PostCard} from "@/components/post/post-card";

export default function Home() {
  const [activeView, setActiveView] = useState("posts")

  return (
      <MainLayout activeView={activeView} setActiveView={setActiveView}>
          <div className="space-y-4">
              {activeView === "posts" && (
                  <div className="posts">
                      <h2 className="text-lg font-semibold mb-2">Posts</h2>
                      <PostCard
                          avatar="/placeholder.svg"
                          username="John Doe"
                          content="Just posted something amazing! Check it out!"
                          timestamp="2 hours ago"
                          network="twitter"
                      />
                      <PostCard
                          avatar="/placeholder.svg"
                          username="Jane Smith"
                          content="Having a great day! How's everyone doing?"
                          timestamp="5 hours ago"
                          network="facebook"
                      />
                  </div>
              )}
              {activeView === "messages" && (
                  <div className="messages">
                      <h2 className="text-lg font-semibold mb-2">Messages</h2>
                      <MessageCard
                          avatar="/placeholder.svg"
                          username="Alice Johnson"
                          lastMessage="Hey, how are you doing?"
                          timestamp="10:30 AM"
                          network="twitter"
                      />
                      <MessageCard
                          avatar="/placeholder.svg"
                          username="Bob Williams"
                          lastMessage="Did you see the latest update?"
                          timestamp="Yesterday"
                          network="linkedin"
                      />
                  </div>
              )}
          </div>
      </MainLayout>
  );
}
